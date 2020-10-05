const selectors = {
  dpFormControl: '.datepicker-component-container .form-control',
  dp: '#datepicker',
  quickRangesItem: '#quick-ranges li',
  leftCarouselControl: '.left.carousel-control',
  rightCarouselControl: '.right.carousel-control',
  daySwitcher: '#day',
  weekSwitcher: '#week',
  monthSwitcher: '#month',
  quickRangesActiveEl: '#quick-ranges .active'
};



const $dp = $(selectors.dp);

const cfg = {
  isMobileView: false,
  switchId: '',
  mobileBreakpoint: 768
};

const chartOptions = {
  chartArea: {
    left: '13%',
    top: '20%',
    width: '75%',
    height: '50%'
  },
  titleTextStyle: {
    color: '#fff',
    fontName: 'Nunito',
    italic: true,
    fontSize: 18,
  },
  hAxis: {
    textStyle: { 
      color: '#fff',
      fontName: 'Nunito',
    },
    viewWindowMode: 'maximized',
  },
  vAxis: {
    baselineColor: '#55B9D3',
    gridlines: {
      color: '#55B9D3'
    },
    minValue: 0,
    textStyle: { 
      color: '#fff',
      fontName: 'Nunito',
    },
    textPosition: 'out',
    format: 'short',
  },
  focusTarget: 'category',
  tooltip: {
    isHtml: true,
    focusTarget: 'category'
  },
  legend: 'none',
  lineWidth: 2,
  dataOpacity: 1,
  pointsVisible: true,
  backgroundColor: { fill: 'transparent' },
  areaOpacity: .2,
};

const datepickerOptions = {
  format: 'dd/mm/yyyy',
  startDate: '01/02/2000',
  clearBtn: true,
  todayBtn: true,
  multidate: true,
  todayHighlight: true,
  weekStart: 1,
  calendarWeeks: false,
  maxViewMode: 2,
  keyboardNavigation: true,
  language: 'fi',
  templates: {
    leftArrow: '<i class="glyphicon glyphicon-triangle-left" style="width: 10px;"></i>',
    rightArrow: '<i class="glyphicon glyphicon-triangle-right" style="width: 10px;"></i>'
  }
};

// Readonly input fields on mobile screens
function toggleReadonlyInputs() {
  if ($(window).width() <= cfg.mobileBreakpoint) {
    $(selectors.dpFormControl)
      .attr('readonly', 'readonly')
      .attr('placeholder', 'Press to choose date');

    cfg.isMobileView = true;
  } else if ($(window).width() > cfg.mobileBreakpoint) {
    $(selectors.dpFormControl)
      .removeAttr('readonly')
      .attr('placeholder', "DD/MM/YYYY");

    cfg.isMobileView = false;
  }
}

function drawChart() {

  // Function generates random data for the chart
  function generateChartData(amount = 5, label = 'days', dateFormat = 'DD/MM/YYYY') {
    const sampleData = [
      ['Time', 'Connected-users']
    ];

    for (let i = 1; i <= amount; i++) {
      const time = moment($dp
          .datepicker('getDate'))
          .add(i - 1, label)
          .format(dateFormat);
      const power = math.random(0) ;

      sampleData[i] = [ time, power ];
    }
    
    const chartData = google.visualization.arrayToDataTable(sampleData);
    
    return chartData;
  }

  // Generate random chart data depending on swichId
  switch(cfg.switchId) {
    case "#day":
      chartData = generateChartData(24, 'hours', 'hh:mm:ms');
      break;

    case "#week":
      chartData = generateChartData();
      break;

    case "#month":
      chartData = generateChartData(30, 'days');
      break;
  }

  chartOptions.title = cfg.switchId == '#day'
      ? 'DAY USers'
      : cfg.switchId == '#week'
        ? 'WEEK USers'
        : 'MONTHUSers';
  chartOptions.hAxis.slantedText = cfg.isMobileView ? true : false;
  chartOptions.hAxis.showTextEvery = cfg.switchId != '#month' ? 3 : 4;
  chartOptions.crosshair = !cfg.isMobileView ? { 
      orientation: 'vertical',
      trigger: 'both',
      color: '#fff'
    } : 'none';
  chartOptions.colors = [ 
      cfg.switchId == '#day' 
          ? '#B4D723'
          : '#B4D723', '#7CB5EC', '#F7A35C'
  ];
  
  let chart;

  if (cfg.switchId === "#day") {
    chart = new google.visualization.LineChart(document.getElementById('chart'));
  } else {
    chart = new google.visualization.LineChart(document.getElementById('chart'));
  }

  chart.draw(chartData, chartOptions);
}


function drawChart01() {

  // Function generates random data for the chart
  function generateChartData(amount = 5, label = 'days', dateFormat = 'DD/MM/YYYY') {
    const sampleData = [
      ['Time', 'Total Data Consumption']
    ];

    for (let i = 1; i <= amount; i++) {
      const time = moment($dp
          .datepicker('getDate'))
          .add(i - 1, label)
          .format(dateFormat);
      const power = math.random(0,300) ;

      sampleData[i] = [ time, power ];
    }
    
    const chartData = google.visualization.arrayToDataTable(sampleData);
    
    return chartData;
  }

  // Generate random chart data depending on swichId
  switch(cfg.switchId) {
    case "#day":
      chartData = generateChartData(24, 'hours', 'hh:mm:ms');
      break;

    case "#week":
      chartData = generateChartData(7,'days');
      break;

    case "#month":
      chartData = generateChartData(30, 'days');
      break;
  }

  chartOptions.title = cfg.switchId == '#day'
      ? 'DAY Data Consumption'
      : cfg.switchId == '#week'
        ? 'WEEK Data Consumption'
        : 'MONTHData Consumption';
  chartOptions.hAxis.slantedText = cfg.isMobileView ? true : false;
  chartOptions.hAxis.showTextEvery = cfg.switchId != '#month' ? 3 : 4;
  chartOptions.crosshair = !cfg.isMobileView ? { 
      orientation: 'vertical',
      trigger: 'both',
      color: '#fff'
    } : 'none';
  chartOptions.colors = [ 
      cfg.switchId == '#day' 
          ? '#B4D723'
          : '#B4D723', '#7CB5EC', '#F7A35C'
  ];
  
  let chart;

  if (cfg.switchId === "#day") {
    chart = new google.visualization.LineChart(document.getElementById('chart1'));
  } else {
    chart = new google.visualization.LineChart(document.getElementById('chart1'));
  }

  chart.draw(chartData, chartOptions);
}



function drawChart1() {

  // Function generates random data for the chart
  function generateChartData(amount = 5, label = 'days', dateFormat = 'DD/MM/YYYY') {
    const sampleData = [
      ['Time', 'ALL PortS']
    ];

    for (let i = 1; i <= amount; i++) {
      const time = moment($dp
          .datepicker('getDate'))
          .add(i - 1, label)
          .format(dateFormat);
      const power = math.random(i)*15 ;

      sampleData[i] = [ time, power ];
    }
    
    const chartData = google.visualization.arrayToDataTable(sampleData);
    
    return chartData;
  }

  // Generate random chart data depending on swichId
  switch(cfg.switchId) {
    case "#day":
      chartData = generateChartData(24, 'hours', 'hh:mm:ms');
      break;

    case "#week":
      chartData = generateChartData(7,'days');
      break;

    case "#month":
      chartData = generateChartData(30, 'days');
      break;
  }

  chartOptions.title = cfg.switchId == '#day'
      ? '  DATA PORTS'
      : cfg.switchId == '#week'
        ? ' Data PORTS'
        : 'Data PORTS';
  chartOptions.hAxis.slantedText = cfg.isMobileView ? true : false;
  chartOptions.hAxis.showTextEvery = cfg.switchId != '#month' ? 3 : 4;
  chartOptions.crosshair = !cfg.isMobileView ? { 
      orientation: 'vertical',
      trigger: 'selection',
      color: '#fff'
    } : 'none';
  chartOptions.colors = [ 
      cfg.switchId == '#day' 
          ? '#B4D723'
          : '#B4D723', '#7CB5EC', '#F7A35C'
  ];
  
  let chart;

  if (cfg.switchId === "#day") {
    chart = new google.visualization.LineChart(document.getElementById('chart1'));
  } else {
    chart = new google.visualization.LineChart(document.getElementById('chart1'));
  }

  chart.draw(chartData, chartOptions);
}



function drawChart6() {

  // Function generates random data for the chart
  function generateChartData(amount = 5, label = 'days', dateFormat = 'DD/MM/YYYY') {
    const sampleData = [
      ['Time', 'Usage']
    ];

    for (let i = 1; i <= amount; i++) {
      const time = moment($dp
          .datepicker('getDate'))
          .add(i - 1, label)
          .format(dateFormat);
      const power = math.random(0,300)*1-10 ;

      sampleData[i] = [ time, power ];
    }
    
   
    const chartData = google.visualization.arrayToDataTable(sampleData);
    
    return chartData;
  }

  // Generate random chart data depending on swichId
  switch(cfg.switchId) {
    case "#day":
      chartData = generateChartData(24, 'hours', 'hh:mm:ms');
      break;

    case "#week":
      chartData = generateChartData(7,'days');
      break;

    case "#month":
      chartData = generateChartData(30, 'days');
      break;
  }

  chartOptions.title = cfg.switchId == '#day'
      ? 'Usage'
      : cfg.switchId == '#week'
        ? 'Usage'
        : ' Usage';
  chartOptions.hAxis.slantedText = cfg.isMobileView ? true : false;
  chartOptions.hAxis.showTextEvery = cfg.switchId != '#month' ? 3 : 4;
  chartOptions.crosshair = !cfg.isMobileView ? { 
      orientation: 'vertical',
      trigger: 'both',
      color: '#fff'
    } : 'none';
  chartOptions.colors = [ 
      cfg.switchId == '#day' 
          ? '#B4D723'
          : '#B4D723', '#7CB5EC', '#F7A35C'
  ];
  
  let chart;

  if (cfg.switchId === "#day") {
    chart = new google.visualization.LineChart(document.getElementById('chart1'));
  } else {
    chart = new google.visualization.LineChart(document.getElementById('chart1'));
  }

  chart.draw(chartData, chartOptions);
}



 
function drawChart2() {

  // Function generates random data for the chart
  function generateChartData(amount = 5, label = 'days', dateFormat = 'DD/MM/YYYY') {
    const sampleData = [
      ['Time', 'Speed']
    ];

    for (let i = 1; i <= amount; i++) {
      const time = moment($dp
          .datepicker('getDate'))
          .add(i - 1, label)
          .format(dateFormat);
      const power = math.random(0) ;

      sampleData[i] = [ time, power ];
    }
    
    const chartData = google.visualization.arrayToDataTable(sampleData);
    
    return chartData;
  }

  // Generate random chart data depending on swichId
  switch(cfg.switchId) {
    case "#day":
      chartData = generateChartData(24, 'hours', 'hh:mm:ms');
      break;

    case "#week":
      chartData = generateChartData();
      break;

    case "#month":
      chartData = generateChartData(30, 'days');
      break;
  }

  chartOptions.title = cfg.switchId == '#day'
      ? 'DAY WISE SPEED'
      : cfg.switchId == '#week'
        ? 'WEEK WISE SPEED'
        : 'MONTHWISE SPEED';
  chartOptions.hAxis.slantedText = cfg.isMobileView ? true : false;
  chartOptions.hAxis.showTextEvery = cfg.switchId != '#month' ? 3 : 4;
  chartOptions.crosshair = !cfg.isMobileView ? { 
      orientation: 'vertical',
      trigger: 'both',
      color: '#fff'
    } : 'none';
  chartOptions.colors = [ 
      cfg.switchId == '#day' 
          ? '#B4D723'
          : '#B4D723', '#7CB5EC', '#F7A35C'
  ];
  
  let chart;

  if (cfg.switchId === "#day") {
    chart = new google.visualization.LineChart(document.getElementById('chart2'));
  } else {
    chart = new google.visualization.LineChart(document.getElementById('chart2'));
  }

  chart.draw(chartData, chartOptions);
}


function drawChart3() {

  // Function generates random data for the chart
  function generateChartData(amount = 5, label = 'days', dateFormat = 'DD/MM/YYYY') {
    const sampleData = [
      ['Time', 'AVGSpeed ']
    ];

    for (let i = 1; i <= amount; i++) {
      const time = moment($dp
          .datepicker('getDate'))
          .add(i - 1, label)
          .format(dateFormat);
      const power = math.random(0, 4)/1;
 
      sampleData[i] = [ time, power ];
    }
    
    const chartData = google.visualization.arrayToDataTable(sampleData);
    
    return chartData;
  }

  // Generate random chart data depending on swichId
  switch(cfg.switchId) {
    case "#day":
      chartData = generateChartData(24, 'hours', 'hh:mm:ms');
      break;

    case "#week":
      chartData = generateChartData(7, 'days');
      break;

    case "#month":
      chartData = generateChartData(30, 'days');
      break;
  }

  chartOptions.title = cfg.switchId == '#day'
      ? 'DAY  AVG SPEED'
      : cfg.switchId == '#week'
        ? 'WEEK  AVG SPEED'
        : 'MONTH AVG SPEED';
  chartOptions.hAxis.slantedText = cfg.isMobileView ? true : false;
  chartOptions.hAxis.showTextEvery = cfg.switchId != '#month' ? 3 : 4;
  chartOptions.crosshair = !cfg.isMobileView ? { 
      orientation: 'vertical',
      trigger: 'both',
      color: '#fff'
    } : 'none';
  chartOptions.colors = [ 
      cfg.switchId == '#day' 
          ? '#B4D723'
          : '#B4D723', '#7CB5EC', '#F7A35C'
  ];
  
  let chart;

  if (cfg.switchId === "#day") {
    chart = new google.visualization.LineChart(document.getElementById('chart3'));
  } else {
    chart = new google.visualization.LineChart(document.getElementById('chart3'));
  }

  chart.draw(chartData, chartOptions);
}

function drawChart4() {

  // Function generates random data for the chart
  function generateChartData(amount = 5, label = 'days', dateFormat = 'DD/MM/YYYY') {
    const sampleData = [
      ['Time', 'AVg Speed Per Data']
    ];

    for (let i = 1; i <= amount; i++) {
      const time = moment($dp
          .datepicker('getDate'))
          .add(i - 1, label)
          .format(dateFormat);
      const power = math.random(0, 50)*6 ;

      sampleData[i] = [ time, power ];
    }

    const chartData = google.visualization.arrayToDataTable(sampleData);
    
    return chartData;
  }

  // Generate random chart data depending on swichId
  switch(cfg.switchId) {
    case "#day":
      chartData = generateChartData(24, 'hours', 'hh:mm:ms');
      break;

    case "#week":
      chartData = generateChartData(7, 'days');
      break;

    case "#month":
      chartData = generateChartData(30, 'days');
      break;
  }

  chartOptions.title = cfg.switchId == '#day'
      ? 'DAY  AVG SPEED Per data'
      : cfg.switchId == '#week'
        ? 'WEEK  AVG SPEED Per data'
        : 'MONTH AVG SPEED Per data';
  chartOptions.hAxis.slantedText = cfg.isMobileView ? true : false;
  chartOptions.hAxis.showTextEvery = cfg.switchId != '#month' ? 3 : 4;
  chartOptions.crosshair = !cfg.isMobileView ? { 
      orientation: 'vertical',
      trigger: 'both',
      color: '#fff'
    } : 'none';
  chartOptions.colors = [ 
      cfg.switchId == '#day' 
          ? '#B4D723'
          : '#B4D723', '#7CB5EC', '#F7A35C'
  ];
  
  let chart;

  if (cfg.switchId === "#day") {
    chart = new google.visualization.LineChart(document.getElementById('chart4'));
  } else {
    chart = new google.visualization.LineChart(document.getElementById('chart4'));
  }

  chart.draw(chartData, chartOptions);
}

function drawChart5() {

  // Function generates random data for the chart
  function generateChartData(amount = 5, label = 'days', dateFormat = 'DD/MM/YYYY') {
    const sampleData = [
      ['Time', 'SIGN UPS']
    ];

    for (let i = 1; i <= amount; i++) {
      const time = moment($dp
          .datepicker('getDate'))
          .add(i - 1, label)
          .format(dateFormat);
      const power = math.random(0, 0) ;

      sampleData[i] = [ time, power ];
    }
    
    const chartData = google.visualization.arrayToDataTable(sampleData);
    
    return chartData;
  }

  // Generate random chart data depending on swichId
  switch(cfg.switchId) {
    case "#day":
      chartData = generateChartData(24, 'hours', 'hh:mm:ms');
      break;

    case "#week":
      chartData = generateChartData(7, 'days');
      break;

    case "#month":
      chartData = generateChartData(30, 'days');
      break;
  }

  chartOptions.title = cfg.switchId == '#day'
      ? 'DAY  sign ups'
      : cfg.switchId == '#week'
        ? 'WEEK  sign ups'
        : 'MONTH sign ups';
  chartOptions.hAxis.slantedText = cfg.isMobileView ? true : false;
  chartOptions.hAxis.showTextEvery = cfg.switchId != '#month' ? 3 : 4;
  chartOptions.crosshair = !cfg.isMobileView ? { 
      orientation: 'vertical',
      trigger: 'both',
      color: '#fff'
    } : 'none';
  chartOptions.colors = [ 
      cfg.switchId == '#day' 
          ? '#B4D723'
          : '#B4D723', '#7CB5EC', '#F7A35C'
  ];
  
  let chart;

  if (cfg.switchId === "#day") {
    chart = new google.visualization.LineChart(document.getElementById('chart5'));
  } else {
    chart = new google.visualization.LineChart(document.getElementById('chart5'));
  }

  chart.draw(chartData, chartOptions);
}


function drawChart12() {

  // Function generates random data for the chart
  function generateChartData(amount = 5, label = 'days', dateFormat = 'DD/MM/YYYY') {
    const sampleData = [
      ['Time', 'bandwidth All PortS']
    ];

    for (let i = 1; i <= amount; i++) {
      const time = moment($dp
          .datepicker('getDate'))
          .add(i - 1, label)
          .format(dateFormat);
      const power = math.random(0, 0) ;

      sampleData[i] = [ time, power ];
    }
    
    const chartData = google.visualization.arrayToDataTable(sampleData);
    
    return chartData;
  }

  // Generate random chart data depending on swichId
  switch(cfg.switchId) {
    case "#day":
      chartData = generateChartData(24, 'hours', 'hh:mm:ms');
      break;

    case "#week":
      chartData = generateChartData(7, 'days');
      break;

    case "#month":
      chartData = generateChartData(30, 'days');
      break;
  }

  chartOptions.title = cfg.switchId == '#day'
      ? 'DAY  PortS'
      : cfg.switchId == '#week'
        ? 'WEEK  PortS'
        : 'MONTH PortS';
  chartOptions.hAxis.slantedText = cfg.isMobileView ? true : false;
  chartOptions.hAxis.showTextEvery = cfg.switchId != '#month' ? 3 : 4;
  chartOptions.crosshair = !cfg.isMobileView ? { 
      orientation: 'vertical',
      trigger: 'both',
      color: '#fff'
    } : 'none';
  chartOptions.colors = [ 
      cfg.switchId == '#day' 
          ? '#B4D723'
          : '#B4D723', '#7CB5EC', '#F7A35C'
  ];
  
  let chart;

  if (cfg.switchId === "#day") {
    chart = new google.visualization.LineChart(document.getElementById('chart6'));
  } else {
    chart = new google.visualization.LineChart(document.getElementById('chart6'));
  }

  chart.draw(chartData, chartOptions);
}

function drawChart13() {

  // Function generates random data for the chart
  function generateChartData(amount = 5, label = 'days', dateFormat = 'DD/MM/YYYY') {
    const sampleData = [
      ['Time', 'Download And Upload Usage']
    ];

    for (let i = 1; i <= amount; i++) {
      const time = moment($dp
          .datepicker('getDate'))
          .add(i - 1, label)
          .format(dateFormat);
      const power = math.random(0, 0) ;

      sampleData[i] = [ time, power ];
    }
    
    const chartData = google.visualization.arrayToDataTable(sampleData);
    
    return chartData;
  }

  // Generate random chart data depending on swichId
  switch(cfg.switchId) {
    case "#day":
      chartData = generateChartData(24, 'hours', 'hh:mm:ms');
      break;

    case "#week":
      chartData = generateChartData(7, 'days');
      break;

    case "#month":
      chartData = generateChartData(30, 'days');
      break;
  }

  chartOptions.title = cfg.switchId == '#day'
      ? 'DAY  Usage'
      : cfg.switchId == '#week'
        ? 'WEEK Usage'
        : 'MONTH Usage';
  chartOptions.hAxis.slantedText = cfg.isMobileView ? true : false;
  chartOptions.hAxis.showTextEvery = cfg.switchId != '#month' ? 3 : 4;
  chartOptions.crosshair = !cfg.isMobileView ? { 
      orientation: 'vertical',
      trigger: 'both',
      color: '#fff'
    } : 'none';
  chartOptions.colors = [ 
      cfg.switchId == '#day' 
          ? '#B4D723'
          : '#B4D723', '#7CB5EC', '#F7A35C'
  ];
  
  let chart;

  if (cfg.switchId === "#day") {
    chart = new google.visualization.LineChart(document.getElementById('chart6'));
  } else {
    chart = new google.visualization.LineChart(document.getElementById('chart6'));
  }

  chart.draw(chartData, chartOptions);
}


function drawChart7() {

  // Function generates random data for the chart
  function generateChartData(amount = 5, label = 'days', dateFormat = 'DD/MM/YYYY') {
    const sampleData = [
      ['Time', 'bandwidth Usage']
    ];

    for (let i = 1; i <= amount; i++) {
      const time = moment($dp
          .datepicker('getDate'))
          .add(i -0.1, label)
          .format(dateFormat);
      const power = math.random(0,300)-40 ;

      sampleData[i] = [ time, power ];
    }
    
    const chartData = google.visualization.arrayToDataTable(sampleData);
    
    return chartData;
  }

  // Generate random chart data depending on swichId
  switch(cfg.switchId) {
    case "#day":
      chartData = generateChartData(24, 'hours', 'hh:mm');
      break;

    case "#week":
      chartData = generateChartData(7, 'days');
      break;

    case "#month":
      chartData = generateChartData(30, 'days');
      break;
  }

  chartOptions.title = cfg.switchId == '#day'
      ? 'DAY  bandwidth Usage'
      : cfg.switchId == '#week'
        ? 'WEEK  bandwidth Usage'
        : 'MONTH bandwidth Usage';
  chartOptions.hAxis.slantedText = cfg.isMobileView ? true : false;
  chartOptions.hAxis.showTextEvery = cfg.switchId != '#month' ? 3 : 4;
  chartOptions.crosshair = !cfg.isMobileView ? { 
      orientation: 'vertical',
      trigger: 'both',
      color: '#fff'
    } : 'none';
  chartOptions.colors = [ 
      cfg.switchId == '#day' 
          ? '#B4D723'
          : '#B4D723', '#7CB5EC', '#F7A35C'
  ];
  
  let chart;

  if (cfg.switchId === "#day") {
    chart = new google.visualization.LineChart(document.getElementById('chart6'));
  } else {
    chart = new google.visualization.LineChart(document.getElementById('chart6'));
  }

  chart.draw(chartData, chartOptions);
}

function drawChart8() {

  // Function generates random data for the chart
  function generateChartData(amount = 5, label = 'days', dateFormat = 'DD/MM/YYYY') {
    const sampleData = [
      ['Time', 'LAN Physical Link Up/down']
    ];

    for (let i = 1; i <= amount; i++) {
      const time = moment($dp
          .datepicker('getDate'))
          .add(i -0.1, label)
          .format(dateFormat);
     

      sampleData[i] = [ time, power ];
    }
    
    const chartData = google.visualization.arrayToDataTable(sampleData);
    
    return chartData;
  }

  // Generate random chart data depending on swichId
  switch(cfg.switchId) {
    case "#day":
      chartData = generateChartData(24, 'hours', 'hh:mm:ms');
      break;

    case "#week":
      chartData = generateChartData(7, 'days');
      break;

    case "#month":
      chartData = generateChartData(30, 'days');
      break;
  }

  chartOptions.title = cfg.switchId == '#day'
      ? 'DAY  bandwidth Usage'
      : cfg.switchId == '#week'
        ? 'WEEK  bandwidth Usage'
        : 'MONTH bandwidth Usage';
  chartOptions.hAxis.slantedText = cfg.isMobileView ? true : false;
  chartOptions.hAxis.showTextEvery = cfg.switchId != '#month' ? 3 : 4;
  chartOptions.crosshair = !cfg.isMobileView ? { 
      orientation: 'vertical',
      trigger: 'both',
      color: '#fff'
    } : 'none';
  chartOptions.colors = [ 
      cfg.switchId == '#day' 
          ? '#B4D723'
          : '#B4D723', '#7CB5EC', '#F7A35C'
  ];
  
  let chart;

  if (cfg.switchId === "#day") {
    chart = new google.visualization.LineChart(document.getElementById('chart7'));
  } else {
    chart = new google.visualization.LineChart(document.getElementById('chart7'));
  }

  chart.draw(chartData, chartOptions);
}

function drawChart9() {

  // Function generates random data for the chart
  function generateChartData(amount = 5, label = 'days', dateFormat = 'DD/MM/YYYY') {
    const sampleData = [
      ['Time', 'WAN Physical Link Up/down']
    ];

    for (let i = 1; i <= amount; i++) {
      const time = moment($dp
          .datepicker('getDate'))
          .add(i -0.1, label)
          .format(dateFormat);
     

      sampleData[i] = [ time, power ];
    }
    
    const chartData = google.visualization.arrayToDataTable(sampleData);
    
    return chartData;
  }

  // Generate random chart data depending on swichId
  switch(cfg.switchId) {
    case "#day":
      chartData = generateChartData(24, 'hours', 'hh:mm:ms');
      break;

    case "#week":
      chartData = generateChartData(7, 'days');
      break;

    case "#month":
      chartData = generateChartData(30, 'days');
      break;
  }

  chartOptions.title = cfg.switchId == '#day'
      ? 'DAY  bandwidth Usage'
      : cfg.switchId == '#week'
        ? 'WEEK  bandwidth Usage'
        : 'MONTH bandwidth Usage';
  chartOptions.hAxis.slantedText = cfg.isMobileView ? true : false;
  chartOptions.hAxis.showTextEvery = cfg.switchId != '#month' ? 3 : 4;
  chartOptions.crosshair = !cfg.isMobileView ? { 
      orientation: 'vertical',
      trigger: 'both',
      color: '#fff'
    } : 'none';
  chartOptions.colors = [ 
      cfg.switchId == '#day' 
          ? '#B4D723'
          : '#B4D723', '#7CB5EC', '#F7A35C'
  ];
  
  let chart;

  if (cfg.switchId === "#day") {
    chart = new google.visualization.LineChart(document.getElementById('chart8'));
  } else {
    chart = new google.visualization.LineChart(document.getElementById('chart8'));
  }

  chart.draw(chartData, chartOptions);
}


// Chart switches
function switchChart(switcher) {
  $(switcher).click( function() {
    $(selectors.quickRangesItem).removeClass("active");
    $(this).addClass("active");

    $dp.datepicker("setEndDate", 'd');

    cfg.switchId = switcher;
    
    drawChart();
  drawChart01();
  drawChart1();
   
     drawChart2();
     drawChart3();
     drawChart4();
   drawChart5();

drawChart6();
drawChart7();
     drawChart8();
     drawChart9();
     drawChart12();
     drawChart13();
    return false;
  })
}

// Initial chart
function initializeChart() {
  var myid = $(selectors.quickRangesActiveEl).attr('id');
  $('#' + myid).trigger('click');
};

// DATEPICKER
// Options
$dp.datepicker(datepickerOptions);


// Setting the date of the datepicker
$dp.datepicker("setDate", 'd');

// Navigating data-picker from carousel-controls 
function dateSwitchControl(offsetAmount, offsetPeriod) {
  // startDate and endDate should be set in UTC time 
  const startDateUtc = moment.utc(
    $dp.datepicker("getStartDate")
  ).format();
  const startDateUnix = moment(startDateUtc).unix();
  
  const endDateUtc = moment.utc(
    $dp.datepicker("getEndDate")
  ).format();
  const endDateUnix = moment(endDateUtc).unix();
  
  const currentDate = moment(
    $dp.datepicker("getDate")
  );
  const currentDateUnix = moment(currentDate).unix();
  
  const newDateUnix = moment.unix(currentDateUnix).add(offsetAmount, offsetPeriod).unix();
  const newDate = new Date (moment.unix(newDateUnix));

  if (newDateUnix >= startDateUnix && newDateUnix <= endDateUnix) {
    if (offsetPeriod === 'month' && moment(currentDate).format("DD") !== "01") {
        $dp.datepicker('setDate', 
           offsetAmount < 0
            ? moment(currentDate).format("01/MM/YYYY")
            : moment(currentDate).add(1, 'month').format("01/MM/YYYY")
        );
    } else {
      $dp.datepicker('setDate', newDate);
    }
  } else if (newDateUnix < startDateUnix) {
    $dp.datepicker('setDate', startDateUtc);
  } else if (newDateUnix > endDateUnix) {
    $dp.datepicker('setDate', endDateUtc);
  }
}

function getPrevPeriod() {
  if (cfg.switchId === selectors.daySwitcher) {
    dateSwitchControl(-1, 'day');
  } else if (cfg.switchId === selectors.weekSwitcher) {
    dateSwitchControl(-1, 'week');
  } else if (cfg.switchId === selectors.monthSwitcher) {
    dateSwitchControl(-1, 'month');
  }
}

function getNextPeriod() {
  if (cfg.switchId === selectors.daySwitcher) {
    dateSwitchControl(1, 'day');
  } else if (cfg.switchId === selectors.weekSwitcher) {
    dateSwitchControl(1, 'week');
  } else if (cfg.switchId === selectors.monthSwitcher) {
    dateSwitchControl(1, 'month');
  }
}

$(selectors.leftCarouselControl).on('click', function() {
  getPrevPeriod();
});

$(selectors.rightCarouselControl).on('click', function() {
  getNextPeriod();
});

// Keyboard navigation
// Left arrow (code 37): show previous period
// Right arrow (code 39): show next period
// Up and down (codes 38 and 40, respectively): navigate ranges
$(document).keyup(function(e) {
  if (e.keyCode === 37) {
    getPrevPeriod();
  } else if (e.keyCode === 39) {
    getNextPeriod();
  }
});

google.charts.load('current', {'packages': ['corechart']});
google.charts.setOnLoadCallback(initializeChart);
google.charts.setOnLoadCallback(drawChart1);
 

toggleReadonlyInputs();

let width = $(window).width();

$(window).resize(function () {
  if ($(this).width() !== width) {
    drawChart();

    width = $(this).width();
  }

  toggleReadonlyInputs();
});

switchChart(selectors.daySwitcher);
switchChart(selectors.weekSwitcher);
switchChart(selectors.monthSwitcher);

// Update chart on datepicker's changeDate
$dp
  .datepicker()
  .on("changeDate", function(e) {

      drawChart();
 drawChart01();
 drawChart1();
      drawChart2();
      drawChart3();
       drawChart4();
         drawChart5();
     drawChart6();
     drawChart7();
     drawChart8();
      drawChart9();
       drawChart12();
     drawChart13();
  });




