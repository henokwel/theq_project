
export const appReducer = (state, action) => {

    // console.log(state);
    // console.log(action.type);
    // console.log("payload =>", action.payload);

    switch (action.type) {
        case "add_quiz":
            {

                return [
                    ...state,
                    action.payload
                ];

            }

            break;
        case "del_quiz": {
            return state.filter(item => item.id !== action.payload)

        }
            break;
        case "done": {

            return state.map(item => {
                if (item.id === action.payload) {
                    return {
                        ...item,
                        done: !item.done
                    }
                }
                return item
            })
        }

        default:
            {
                return state;
            }
            break;
    }
};