const fruits = [
    {
        id: 1,
        name: "apple",
        price: 10
    },
    {
        id: 2,
        name: "orange",
        price: 7
    },
    {
        id: 3,
        name: "watermelon",
        price: 4
    }
];

let identity = 3;

const post = (data, cb) => {
    const { name } = data;
    const exists = fruits.find(f => f.name == name);

    if(exists){
        const error = Error('El elemento ya existe');
        error.err = 'E_RESOURCE_EXISTS';
        setImmediate(() => cb(error));
    }

    identity++;
    data.id = identity;
    fruits.push(data);
    setImmediate(() => cb(null, identity));
};

const get = (cb) => {
    setImmediate(() => cb(null, fruits));
};

const getFruit = (id, cb) => {
    const fruit = fruits.find(f => f.id == id);
    if(!fruit) {
        const error = Error('No se encontró el elemento');
        error.err = 'E_NOT_FOUND';
        setImmediate(() => cb(error));
    }

    setImmediate(() => cb(null, fruit));
};

const put = (id, data, cb) => {
    const fruit = fruits.find(f => f.id == id);

    if(!fruit){
        const error = Error('No se encontró el elemento');
        error.err = 'E_NOT_FOUND';
        setImmediate(() => cb(error));
    }

    const index = fruits.findIndex(f => f.id == id);
    data.id = id;
    fruits[index] = data;
    setImmediate(() => cb(null, data));
};

const del = (id, cb) => {
    const fruit = fruits.find(f => f.id == id);

    if(!fruit){
        const error = Error('No se encontró el elemento');
        error.err = 'E_NOT_FOUND';
        setImmediate(() => cb(error));
    }

    const index = fruits.findIndex(f => f.id == id);
    fruits.splice(index, 1);
    setImmediate(() => cb(null, id));
};

export default {
    post,
    get,
    getFruit,
    put,
    del
};