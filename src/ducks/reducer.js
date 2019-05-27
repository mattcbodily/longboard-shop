const initialState = {
    design: {
        name: '',
        size: '',
        image: '',
        price: 0.00
    },
    grip: {
        name: '',
        image: '',
        price: 0.00
    },
    trucks: {
        name: '',
        image: '',
        price: 0.00
    },
    wheels: {
        color: '',
        image: '',
        price: 0.00
    },
    graphic: '',
    total: 89.99
}

const UPDATE_DESIGN = 'UPDATE_DESIGN';
const UPDATE_GRIP = 'UPDATE_GRIP';
const UPDATE_TRUCKS = 'UPDATE_TRUCKS';
const UPDATE_WHEELS = 'UPDATE_WHEELS';
const UPDATE_GRAPHIC = 'UPDATE_GRAPHIC';

export function updateDesign(designObj){
    return {
        type: UPDATE_DESIGN,
        payload: designObj
    }
}

export function updateGrip(gripObj){
    return {
        type: UPDATE_GRIP,
        payload: gripObj
    }
}

export function updateTrucks(trucksObj){
    return {
        type: UPDATE_TRUCKS,
        payload: trucksObj
    }
}

export function updateWheels(wheelsObj){
    return {
        type: UPDATE_WHEELS,
        payload: wheelsObj
    }
}

export function updateGraphic(graphicObj){
    return {
        type: UPDATE_GRAPHIC,
        payload: graphicObj
    }
}

export default function reducer(state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case UPDATE_DESIGN:
            let design = {
                name: payload.name,
                image: payload.image,
                price: payload.price
            }
            return {...state, design};
        case UPDATE_GRIP:
            let grip = {
                name: payload.name,
                image: payload.image,
                price: payload.price
            }
            return {...state, grip}
        case UPDATE_TRUCKS:
            let trucks = {
                name: payload.name,
                image: payload.image,
                price: payload.price
            }
            return {...state, trucks}
        case UPDATE_WHEELS:
            let wheels = {
                color: payload.color,
                image: payload.image,
                price: payload.price
            }
            return {...state, wheels}
        case UPDATE_GRAPHIC:
            let graphic = payload.graphic; 
            return {...state, graphic}
        default:
            return state;
    }
}