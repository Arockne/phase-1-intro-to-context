// Your code here
//assumptions
/*
1. Employees always check in and check out
2. Employees always check in out on the hour
3. The time is represented on a 24-hour clock (1300 1:00pm)
4 When timestamps are needed, they will be provided as STRING's in the form ("YYYY-MM-DD 800")
5. Employees will not work until the next day
  ..Ex: employee day will not start at 2200 and end at 0400

CAN EXTEND THE CHALLENGE IF YOU WANT TO
*/

function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
  return {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(employees) {
  return employees.map(createEmployeeRecord);
}

function createTimeInEvent(employee, timeStamp) {
  timeStamp = timeStamp.split(' ');
  employee.timeInEvents.push({
    type: 'TimeIn',
    hour: Number(timeStamp[1]),
    date: timeStamp[0]
  })
  return employee;
}

function createTimeOutEvent(employee, timeStamp) {
  timeStamp = timeStamp.split(' ');
  employee.timeOutEvents.push({
    type: 'TimeOut',
    hour: Number(timeStamp[1]),
    date: timeStamp[0]
  })
  return employee;
}

function hoursWorkedOnDate(employee, dateInput) {
  const timeIn = employee.timeInEvents.find(({date}) => date === dateInput);
  const timeOut = employee.timeOutEvents.find(({date}) => date === dateInput);
  return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(employee, dateInput) {
  const {payPerHour} = employee
  return hoursWorkedOnDate(employee, dateInput) * payPerHour;
}

function allWagesFor(employee) {
  return employee.timeInEvents.reduce((sum, {date}) => {
    return sum + wagesEarnedOnDate(employee, date);
  }, 0);
}

function calculatePayroll(employees) {
  return employees.reduce((sum, employee) => sum + allWagesFor(employee), 0);
}