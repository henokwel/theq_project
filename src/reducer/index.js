
export const appReducer = (state, action) => {
    switch (action.type) {
        case "add":
            {
                return [
                    ...state,
                    {
                        text: "",
                        done: false,
                    },
                ];
            }

            break;
        case "del": {
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