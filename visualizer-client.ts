import Axios from 'axios';

const getVisualizer = (port: number = 8181) => {

    return {

        reset: (h: number, w: number, cells: number[][] = []) => {
            return Axios.post(
                `http://localhost:${port}`,
                JSON.stringify(['reset', h, w, cells])
            );
        },

        visit: (r: number, c: number) => {
            return Axios.post(
                `http://localhost:${port}`,
                JSON.stringify(['visit', r, c])
            );
        },

        backtrack: () => {
            return Axios.post(
                `http://localhost:${port}`,
                JSON.stringify(['backtrack'])
            );
        },

        label: (r: number, c: number, l: string) => {
            return Axios.post(
                `http://localhost:${port}`,
                JSON.stringify(['label', r, c, l])
            );
        }

    };

};

export { getVisualizer };

// const v = getVisualizer();
// v.reset(10, 10);
// v.label(0, 0, 'S');
// v.visit(2, 3);
// v.backtrack();
