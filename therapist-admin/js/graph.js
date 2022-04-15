let myChart = document.getElementById("myChart").getContext('2d');

let massPopChart = new Chart(myChart, {
    type: 'bar',
    data: {
        labels: ['Users','Appointments','Articles','Newsletters'],
        datasets: [{
            label: 'Population',
            data: [
                20,
                30,
                25,
                45,
            ],
            backgroundColor: [
                'rgba(255,99,132,0.6)',
                'rgba(54,162,235,0.6)',
                'rgba(255,206,86,0.6)',
                
            ],
        }]
    },
    options: {
        title: {
            display: true,
            text: "Overview of Healing Hands Management Project"
        }
    }
})