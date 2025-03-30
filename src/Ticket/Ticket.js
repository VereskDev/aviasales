import React from "react";
import PropTypes from "prop-types";
import "./Ticket.scss";

export default function Ticket({ ticket }) {
    function convertMinutesToHours(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}ч ${mins}м`;
    }

    function formatFlightTime(date, duration) {
        const departure = new Date(date);
        const arrival = new Date(departure.getTime() + duration * 60000);
        const options = { hour: "2-digit", minute: "2-digit" };
        return `${departure.toLocaleTimeString("ru-RU", options)} - ${arrival.toLocaleTimeString("ru-RU", options)}`;
    }

    return (
        <div className="ticket">
            <div className="ticket-pricelogo">
                <p>{ticket.price} P</p>
                <img
                    src={`https://pics.avs.io/110/36/${ticket.carrier}.png`}
                    alt={ticket.carrier}
                />
            </div>
            <div className="ticket-description">
                {ticket.segments.map((segment, idx) => (
                    <div key={`${ticket.carrier}-${ticket.price}-${segment.duration}-${idx}`} className="ticket-segment">
                        <div className="ticket-route">
                            <p className="gray">
                                {segment.origin} – {segment.destination}
                            </p>
                            <p>{formatFlightTime(segment.date, segment.duration)}</p>
                        </div>
                        <div className="ticket-duration">
                            <p className="gray">В пути</p>
                            <p>{convertMinutesToHours(segment.duration)}</p>
                        </div>
                        <div className="ticket-stops">
                            {segment.stops.length === 0 ? (
                                <p className="gray">Без пересадок</p>
                            ) : (
                                <>
                                    <p className="gray">
                                        {segment.stops.length === 1
                                            ? `1 пересадка`
                                            : `${segment.stops.length} пересадки`}
                                    </p>
                                    <p>{segment.stops.join(", ")}</p>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

Ticket.propTypes = {
    ticket: PropTypes.shape({
        price: PropTypes.number.isRequired,
        carrier: PropTypes.string.isRequired,
        segments: PropTypes.arrayOf(
            PropTypes.shape({
                stops: PropTypes.array.isRequired,
            })
        ).isRequired,
    }).isRequired,
};
