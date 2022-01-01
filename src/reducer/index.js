
export const appReducer = (state, action) => {
    switch (action.type) {
        case "add":
            {

                console.log("Added");
                console.log(action.payload);
                // return [
                //     ...state,
                //     {
                //         text: "",
                //         done: false,
                //     },
                // ];
                return state
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