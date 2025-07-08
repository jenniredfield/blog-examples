import { TodoService } from "./TodoService";

describe("TodoService", () => {
  describe("fetch", () => {
    it("should throw an error if the response is not ok", async () => {
      const todoService = new TodoService();
      jest.spyOn(global, "fetch").mockImplementation(() => {
        throw new Error("Failed to fetch todos");
      });

      await expect(todoService.fetch()).rejects.toThrow(
        "Failed to fetch todos"
      );
    });
    it("should call the correct endpoint", async () => {
      const todoService = new TodoService();
      const globalFetch = jest.spyOn(global, "fetch").mockResolvedValue({
        ok: true,
        json: async () => [{ id: 1, title: "Test" }],
      } as Response);

      await todoService.fetch();
      expect(globalFetch).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/todos"
      );
    });

    it("should return the correct data", async () => {
      const todoService = new TodoService();
      jest.spyOn(global, "fetch").mockResolvedValue({
        ok: true,
        json: async () => [{ id: 1, title: "Test" }],
      } as Response);

      const result = await todoService.fetch();
      expect(result).toEqual([{ id: 1, title: "Test" }]);
    });
  });
});
