import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainUlFilter from "../MainUlFilter/MainUlFilter";
import Ticket from "../Ticket/Ticket";
import { fetchTickets } from "../reduxComponents/ticketActions";
import "./MainUl.css";

export default function MainUl() {
  const dispatch = useDispatch();
  const { tickets, loading, error } = useSelector((state) => state.tickets);
  const { checkboxes, sort } = useSelector((state) => state.filters);
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      const stops = ticket.segments[0]?.stops.length || 0;
      return (
          checkboxes.all ||
          (checkboxes.none && stops === 0) ||
          (checkboxes.f1 && stops === 1) ||
          (checkboxes.f2 && stops === 2) ||
          (checkboxes.f3 && stops === 3)
      );
    });
  }, [tickets, checkboxes]);

  const sortedTickets = useMemo(() => {
    return [...filteredTickets].sort((a, b) => {
      if (sort === "cheapest") {
        return a.price - b.price;
      }
      if (sort === "fastest") {
        return a.segments[0].duration - b.segments[0].duration;
      }
      return 0;
    });
  }, [filteredTickets, sort]);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;

  return (
      <div className="centered">
        <MainUlFilter />
        <ul className="tickets">
          {sortedTickets.length > 0 ? (
              sortedTickets.slice(0, visibleCount).map((ticket) => (
                  <Ticket key={`${ticket.carrier}-${ticket.price}-${ticket.segments[0].duration}`} ticket={ticket} />
              ))
          ) : (
              <p>Билетов не найдено</p>
          )}
        </ul>
        {visibleCount < sortedTickets.length && (
            <button className='show-more' onClick={handleShowMore}>Показать ещё</button>
        )}
      </div>
  );
}
