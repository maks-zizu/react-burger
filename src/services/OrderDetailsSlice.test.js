import orderDetailsSlice, {
  orderDetailsAdd,
  orderDetailsDel,
  initialState,
} from "./OrderDetailsSlice";

describe("Тестирование OrderDetailsSlice", () => {
  it("начальное состояние", () => {
    expect(orderDetailsSlice(undefined, { type: undefined })).toEqual(
      initialState
    );
  });

  it("загрузка orderDetails", () => {
    const action = { type: orderDetailsAdd.pending.type };
    const state = orderDetailsSlice(initialState, action);
    expect(state.loading).toBe(true);
  });

  it("успешная загрузка orderDetails", () => {
    const orderData = { name: "Order1", order: { number: 123 }, success: true };
    const action = { type: orderDetailsAdd.fulfilled.type, payload: orderData };
    const state = orderDetailsSlice(initialState, action);
    expect(state.orderDetailsData).toEqual(orderData);
    expect(state.loading).toBe(false);
  });

  it("ошибка при загрузке orderDetails", () => {
    const errorAction = {
      type: orderDetailsAdd.rejected.type,
      error: { message: "Ошибка оформления заказа" },
    };
    const state = orderDetailsSlice(initialState, errorAction);
    expect(state.err).toBe("Ошибка оформления заказа");
    expect(state.loading).toBe(false);
  });

  it("сброс orderDetails", () => {
    const preActionState = {
      ...initialState,
      orderDetailsData: {
        name: "Order1",
        order: { number: 123 },
        success: true,
      },
    };
    const action = { type: orderDetailsDel.type };
    const state = orderDetailsSlice(preActionState, action);
    expect(state.orderDetailsData).toBeNull();
    expect(state.err).toBeNull();
    expect(state.loading).toBe(false);
  });
});
