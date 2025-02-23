import { create } from "zustand";

interface State {
  JSONResponse: object | Array<any>;
  fetchToAPI: (n: number) => Promise<any>;
}

export const useFetchStore = create<State>((set, get) => ({
  JSONResponse: {},
  fetchToAPI: async (n: number) => {
    console.log("Hola soy JavaScript estoy intentando hacer un fetch");
    try {
      const response = await fetch("https://porrex35.onrender.com/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phase: n }),
      });

      if (response.ok) {
        const data = await response.json();
        const parsedData = n === 1 || n === 3 ? eval(data.bot) : data.bot;
        console.log(parsedData);
        set({ JSONResponse: parsedData }); // Almacena la respuesta en JSONResponse
        return parsedData;
      } else {
        const err = await response.text();
        alert(err);
        throw new Error(err);
      }
    } catch (error) {
      console.error("Error en fetchToAPI:", error);
      throw error;
    }
  },
}));

export default useFetchStore;
