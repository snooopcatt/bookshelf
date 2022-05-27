import { setData } from "./dataSlice";

const loadData = dispatch => {
    fetch('./inventory.json')
    .then(response => response.json())
    .then(json => {
        console.log('load data');
        dispatch(setData(json));
    });
};

export { loadData };
