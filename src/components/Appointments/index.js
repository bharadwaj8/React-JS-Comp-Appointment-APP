import {Component} from 'react'
import {format} from 'date-fns'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {appointmentsList: [], title: '', date: '', activeStar: false}

  getTitle = event => {
    this.setState({title: event.target.value})
  }

  getDate = event => {
    console.log(format(new Date(event.target.value), 'dd MMMM yyyy, EEE'))
    this.setState({
      date: event.target.value,
    })
  }

  addAppointment = () => {
    const {title, date} = this.state

    const newAppointment = {
      id: uuidv4(),
      title,
      date,
      isStar: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  updateStar = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(each => {
        if (each.id === id) {
          return {...each, isStar: !each.isStar}
        }
        return each
      }),
    }))
  }

  filterStar = () => {
    this.setState(prevState => ({
      activeStar: !prevState.activeStar,
    }))
  }

  render() {
    const {appointmentsList, title, date, activeStar} = this.state

    const active = activeStar ? 'active' : ''
    const filteredAppointmentsList = activeStar
      ? appointmentsList.filter(each => each.isStar === true)
      : appointmentsList

    return (
      <div className="bg">
        <div className="card">
          <div className="card-header">
            <div className="card-input">
              <h1 className="heading">Add Appointment</h1>
              <label className="label" htmlFor="title">
                Title
              </label>
              <input
                className="input"
                id="title"
                placeholder="Title"
                onChange={this.getTitle}
                value={title}
              />
              <label className="label" htmlFor="date">
                Date
              </label>
              <input
                type="date"
                id="date"
                className="input"
                onChange={this.getDate}
                value={date}
              />
              <button
                className="add-button"
                type="button"
                onClick={this.addAppointment}
              >
                Add
              </button>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="image"
            />
          </div>
          <hr className="line" />
          <div className="card-footer">
            <div className="card-footer-header">
              <h1 className="footer-heading">Appointments</h1>
              <button
                className={`filter-button ${active}`}
                type="button"
                onClick={this.filterStar}
              >
                Starred
              </button>
            </div>
            <ul className="card-appointments">
              {filteredAppointmentsList.map(each => (
                <AppointmentItem
                  key={each.id}
                  details={each}
                  updateStar={this.updateStar}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
