import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {details, updateStar} = props
  const {title, date, isStar, id} = details

  const changeStar = () => {
    updateStar(id)
  }

  return (
    <li className="appointment">
      <div className="appointment-header">
        <p className="appointment-title">{title}</p>
        <button
          className="star-button"
          testid="star"
          type="button"
          onClick={changeStar}
        >
          <img
            src={
              isStar
                ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
                : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
            }
            alt="star"
            className="start-icon"
          />
        </button>
      </div>
      <p className="appointment-desc">
        Date: {format(new Date(date), 'dd MMMM yyyy, EEEE')}
      </p>
    </li>
  )
}

export default AppointmentItem
