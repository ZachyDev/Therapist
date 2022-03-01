let therapistRef = db.collection('profileDetails');
let deleteIDs = [];

const displayTherapist = async (doc) => {
	console.log('displayTherapist');

	let therapists = therapistRef;
	// .startAfter(doc || 0).limit(10000)

	const data = await therapists.get();

	data.docs.forEach(doc => {
		const therapist = doc.data();
		let item =
			`<tr data-id="${doc.id}">
					<td>
							<span class="custom-checkbox">
									<input type="checkbox" id="${doc.id}" name="options[]" value="${doc.id}">
									<label for="${doc.id}"></label>
							</span>
					</td>
					<td class="therapist-name">${therapist.name}</td>
					<td class="therapist-email">${therapist.email}</td>
					<td class="therapist-address">${therapist.address}</td>
					<td class="therapist-phone">${therapist.phone}</td>
					
			</tr>`;

		$('#therapist-table').append(item);

		// ACTIVATE TOOLTIP
		$('[data-toggle="tooltip"]').tooltip();

		// SELECT/DESELECT CHECKBOXES
		var checkbox = $('table tbody input[type="checkbox"]');
		$("#selectAll").click(function () {
			if (this.checked) {
				checkbox.each(function () {
					console.log(this.id);
					deleteIDs.push(this.id);
					this.checked = true;
				});
			} else {
				checkbox.each(function () {
					this.checked = false;
				});
			}
		});
		checkbox.click(function () {
			if (!this.checked) {
				$("#selectAll").prop("checked", false);
			}
		});
	})

	// UPDATE LATEST DOC
	latestDoc = data.docs[data.docs.length - 1];

	// UNATTACH EVENT LISTENERS IF NO MORE DOCS
	if (data.empty) {
		$('.js-loadmore').hide();
	}
}


$(document).ready(function () {

	let latestDoc = null;

	// LOAD INITIAL DATA
	displayTherapist();

	// LOAD MORE
	$(document).on('click', '.js-loadmore', function () {
		displayTherapist(latestDoc);
	});


	// ADD therapist
	let addTherapist = document.querySelector('#add-therapist-form');
	addTherapist.addEventListener('submit', e => {
		e.preventDefault();	
		let therapistName = document.getElementById('therapist-name').value;
		let therapistEmail = document.getElementById('therapist-email').value;
		let therapistAddress = document.getElementById('therapist-address').value;
		let therapistPhone =  document.getElementById('therapist-phone').value;
		db.collection('profileDetails').add({
			name: therapistName,
			email: therapistEmail,
			address: therapistAddress,
			phone: therapistPhone,
			createdAt : firebase.firestore.FieldValue.serverTimestamp()
			}).then(function (docRef) {
				console.log("Document written with ID: ", docRef.id);
				$("#addTherapistModal").modal('hide');

				let newtherapist =
				`<tr data-id="${docRef.id}">
						<td>
								<span class="custom-checkbox">
										<input type="checkbox" id="${docRef.id}" name="options[]" value="${docRef.id}">
										<label for="${docRef.id}"></label>
								</span>
						</td>
						<td class="therapist-name">${therapistName}</td>
						<td class="therapist-email">${therapistEmail}</td>
						<td class="therapist-address">${therapistAddress}</td>
						<td class="therapist-phone">${therapistPhone}</td>
						<td>
								<a href="#" id="${docRef.id}" class="edit js-edit-therapist"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
								</a>
								<a href="#" id="${docRef.id}" class="delete js-delete-therapist"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
								</a>
						</td>
				</tr>`;

			$('#therapist-table tbody').prepend(newtherapist);
			})
			.catch(function (error) {
				console.error("Error writing document: ", error);
			});
	})


	// UPDATE therapist
	$(document).on('click', '.js-edit-therapist', function (e) {
		e.preventDefault();
		let id = $(this).attr('id');
		$('#edit-therapist-form').attr('edit-id', id);
		db.collection('profileDetails').doc(id).get().then(function (document) {
			if (document.exists) {
				$('#edit-therapist-form #therapist-name').val(document.data().name);
				$('#edit-therapist-form #therapist-email').val(document.data().email);
				$('#edit-therapist-form #therapist-address').val(document.data().address);
				$('#edit-therapist-form #therapist-phone').val(document.data().phone);
				$('#edittherapistModal').modal('show');
			} else {
				console.log("No such document!");
			}
		}).catch(function (error) {
			console.log("Error getting document:", error);
		});
	});

	$("#edit-therapist-form").submit(function (event) {
		event.preventDefault();
		let id = $(this).attr('edit-id');
		let therapistName = $('#edit-therapist-form #therapist-name').val();
		let therapistEmail = $('#edit-therapist-form #therapist-email').val();
		let therapistAddress = $('#edit-therapist-form #therapist-address').val();
		let therapistPhone =  $('#edit-therapist-form  #therapist-phone').val();

		db.collection('therapists').doc(id).update({
			name: therapistName,
			email: therapistEmail,
			address: therapistAddress,
			phone: therapistPhone,
			updatedAt : firebase.firestore.FieldValue.serverTimestamp()
		});

		$('#editTherapistModal').modal('hide');

		// SHOW UPDATED DATA ON BROWSER
		$('tr[data-id=' + id + '] td.therapist-name').html(therapistName);
		$('tr[data-id=' + id + '] td.therapist-email').html(therapistEmail);
		$('tr[data-id=' + id + '] td.therapist-address').html(therapistAddress);
		$('tr[data-id=' + id + '] td.therapist-phone').html(therapistPhone);
	});

	// DELETE therapist
	$(document).on('click', '.js-delete-therapist', function (e) {
		e.preventDefault();
		let id = $(this).attr('id');
		$('#delete-therapist-form').attr('delete-id', id);
		$('#deleteTherapistModal').modal('show');
	});

	$("#delete-therapist-form").submit(function (event) {
		event.preventDefault();
		let id = $(this).attr('delete-id');
		if (id != undefined) {
			db.collection('therapists').doc(id).delete()
				.then(function () {
					console.log("Document successfully delete!");
					$("#deleteTherapistModal").modal('hide');
				})
				.catch(function (error) {
					console.error("Error deleting document: ", error);
				});
		} else {
			let checkbox = $('table tbody input:checked');
			checkbox.each(function () {
				db.collection('therapists').doc(this.value).delete()
					.then(function () {
						console.log("Document successfully delete!");
						displayTherapist();
					})
					.catch(function (error) {
						console.error("Error deleting document: ", error);
					});
			});
			$("#deleteTherapistModal").modal('hide');
		}
	});

	// SEARCH
	$("#search-name").keyup(function () {
		$('#therapist-table tbody').html('');
		let nameKeyword = $("#search-name").val();
		console.log(nameKeyword);
		therapistRef.orderBy('name', 'asc').startAt(nameKeyword).endAt(nameKeyword + "\uf8ff").get()
			.then(function (documentSnapshots) {
				documentSnapshots.docs.forEach(doc => {
					rendertherapist(doc);
				});
			});
	});

	// RESET FORMS
	$("#addTherapistModal").on('hidden.bs.modal', function () {
		$('#add-therapist-form .form-control').val('');
	});

	$("#editTherapistModal").on('hidden.bs.modal', function () {
		$('#edit-therapist-form .form-control').val('');
	});
});

// CENTER MODAL
(function ($) {
	"use strict";

	function centerModal() {
		$(this).css('display', 'block');
		var $dialog = $(this).find(".modal-dialog"),
			offset = ($(window).height() - $dialog.height()) / 2,
			bottomMargin = parseInt($dialog.css('marginBottom'), 10);

		// Make sure you don't hide the top part of the modal w/ a negative margin if it's longer than the screen height, and keep the margin equal to the bottom margin of the modal
		if (offset < bottomMargin) offset = bottomMargin;
		$dialog.css("margin-top", offset);
	}

	$(document).on('show.bs.modal', '.modal', centerModal);
	$(window).on("resize", function () {
		$('.modal:visible').each(centerModal);
	});
}(jQuery));