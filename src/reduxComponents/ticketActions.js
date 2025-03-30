import { setTickets, setLoading, setError } from "./ticketSlice";

export const fetchTickets = () => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));

    const searchResponse = await fetch(
        "https://aviasales-test-api.kata.academy/search"
    );
    if (!searchResponse.ok) {
      throw new Error(`Ошибка получения searchId: ${searchResponse.status}`);
    }
    const { searchId } = await searchResponse.json();
    console.log("Полученный searchId:", searchId);

    let allTickets = [];
    let stop = false;

    while (!stop) {
      try {
        const ticketResponse = await fetch(
            `https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`
        );
        if (!ticketResponse.ok) {
          if (ticketResponse.status === 500) {
            console.warn("Ошибка 500, пробуем снова...");
            continue;
          }
          throw new Error(`Ошибка получения билетов: ${ticketResponse.status}`);
        }

        const ticketData = await ticketResponse.json();
        console.log("Полученные билеты:", ticketData);

        if (ticketData.tickets) {
          allTickets = [...allTickets, ...ticketData.tickets];
          dispatch(setTickets(allTickets));
        }

        if (ticketData.stop) {
          console.log("Получен stop: true от сервера. Останавливаем загрузку.");
          stop = true;
        }
      } catch (err) {
        console.warn(`Ошибка загрузки билетов: ${err.message}`);
      }
    }
  } catch (error) {
    console.error("Ошибка при загрузке данных:", error);
    dispatch(setError("Ошибка загрузки данных"));
  } finally {
    dispatch(setLoading(false));
  }
};
