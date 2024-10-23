import axios from "axios";

export default axios.create({
    baseURL:'https://appointment-assignment.netlify.app/.netlify/functions'
})