import React from 'react'
import EmployeeFilter from './EmployeeFilter.jsx'
import EmployeeAdd from './EmployeeAdd.jsx'

const initialEmployees = [
    { id: 1, name: 'Zak Ruvalcaba', ext: 1124, email: 'zak@vectacorp.com', title: 'Chief Executive Officer', dateHired: new Date('2018-08-15'), isEmployed: true },
    { id: 2, name: 'Sally Smith', ext: 1125, email: 'sally@vectacorp.com', title: 'Director of Sales', dateHired: new Date('2015-01-03'), isEmployed: true },
    { id: 3, name: 'Patty Ansel', ext: 1112, email: 'patty@vectacorp.com', title: 'Director of Sales', dateHired: new Date('2022-08-24'), isEmployed: true },
    { id: 4, name: 'Gertrude Neil', ext: 1113, email: 'gertrude@vectacorp.com', title: 'Director of Marketing', dateHired: new Date('2022-08-24'), isEmployed: true },
    { id: 5, name: 'Suzi Ledfort', ext: 1115, email: 'suzi@vectacorp.com', title: 'CEO', dateHired: new Date('2015-01-03'), isEmployed: true },
    { id: 6, name: 'Cody Pendant', ext: 1110, email: 'cody@vectacorp.com', title: 'Systems Analist', dateHired: new Date('2022-08-26'), isEmployed: true },
    { id: 7, name: 'Ammal Shookup', ext: 1130, email: 'ammal@vectacorp.com', title: 'Quality Assurance', dateHired: new Date('2022-08-26'), isEmployed: true },
    { id: 8, name: 'Holly Anlikely', ext: 5352, email: 'holly@vectacorp.com', title: 'Sales Manager', dateHired: new Date('2022-09-07'), isEmployed: true },
    { id: 9, name: 'Evan Elpus', ext: 5433, email: 'evan@vectacorp.com', title: 'Software Engineer', dateHired: new Date('2022-09-07'), isEmployed: true },
    { id: 10, name: 'Lois Bidder', ext: 5435, email: 'lois@vectacorp.com', title: 'Administrative Assistant', dateHired: new Date('2022-09-07'), isEmployed: true },
    { id: 11, name: 'Robin Banks', ext: 3344, email: 'robin@vectacorp.com', title: 'Director of Marketing', dateHired: new Date('2022-09-11'), isEmployed: true },
    { id: 12, name: 'John Johnson', ext: 3423, email: 'john@vectacorp.com', title: 'CTO', dateHired: new Date('2022-10-22'), isEmployed: true },
    { id: 13, name: 'Burt Snooper', ext: 4342, email: 'burt@vectacorp.com', title: 'CFO', dateHired: new Date('2022-11-02'), isEmployed: true }
    ]

function EmployeeRow(props) {
    function onDeleteClick() {
        props.deleteEmployee(props.employee.id)
        alert(`Deleting employee ${props.employee.id}`)
    }
    return (
        <tr>
            <td>{props.employee.id}</td>
            <td>{props.employee.name}</td>
            <td>{props.employee.ext}</td>
            <td>{props.employee.email}</td>
            <td>{props.employee.title}</td>
            <td>{props.employee.dateHired.toDateString()}</td>
            <td>{props.employee.isEmployed ? 'Yes' : 'No'}</td>
            <td><button onClick={onDeleteClick}> DELETE </button></td>
        </tr>
    )
}

function EmployeeTable(props) {
    const employeeRows = props.employees.map(employee => 
        <EmployeeRow key={employee.id} employee={employee} deleteEmployee={props.deleteEmployee}/>
    )
    return (
        <table className="bordered-table">
            <thead>
                <tr>
                    <th>ID</th><th>Name</th><th>Extension</th><th>Email</th><th>Title</th><th>Date Hired</th><th>Currently Employed?</th><th></th>
                </tr>
            </thead>
            <tbody>{employeeRows}</tbody>
        </table>
    )
}

export default class EmployeeList extends React.Component {
    constructor() {
        super()
        this.state = { employees: [] }
        this.createEmployee = this.createEmployee.bind(this)
        this.deleteEmployee = this.deleteEmployee.bind(this)
    }
    componentDidMount() { this.loadData() }
    loadData() {
        setTimeout(() => { this.setState({ employees: initialEmployees }) }, 500)
    }
    createEmployee(employee) {
        employee.id = this.state.employees.length + 1
        fetch('/api/employees', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(employee)
        }).then(response => {
            const newEmployeeList = this.state.employees.concat(employee)
            this.setState({ employees: newEmployeeList })
        }).catch(() => {
            const newEmployeeList = this.state.employees.concat(employee)
            this.setState({ employees: newEmployeeList })
        })
    }
    deleteEmployee(id) {
        fetch(`/api/employees/${id}`, { method: 'DELETE' }).then(() => {
            const filteredEmployees = this.state.employees.filter(emp => emp.id !== id)
            this.setState({ employees: filteredEmployees })
        })
    }
    render() {
        return (
            <React.Fragment>
                <h1>Employee Management Application</h1>
                <EmployeeFilter />
                <hr />
                <EmployeeTable employees={this.state.employees} deleteEmployee={this.deleteEmployee} />
                <hr />
                <EmployeeAdd createEmployee={this.createEmployee} />
            </React.Fragment>
        )
    }
}
