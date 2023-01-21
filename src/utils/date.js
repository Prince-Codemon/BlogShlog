import moment from 'moment'

 const formatDate = (date) => {
     return moment(date).format('MMM Do YY')
}

export default formatDate
