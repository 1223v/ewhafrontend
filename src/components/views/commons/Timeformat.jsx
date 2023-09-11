import React from "react";

function Timeformat({ dateString }) {
    const formatDate = (dateString) => {
        let dateQuery = dateString.replace("GMT", "");
        const date = new Date(dateQuery);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const amPm = hours >= 12 ? "오후" : "오전";
        const formattedHours = (hours % 12 || 12).toString().padStart(2, "0");

        return `${year}.${month}.${day} ${amPm} ${formattedHours}:${minutes}`;
    };

    return <span>{formatDate(dateString)}</span>;
}

export default Timeformat;
