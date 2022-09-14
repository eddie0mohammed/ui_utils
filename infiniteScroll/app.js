
const API = 'https://jsonplaceholder.typicode.com/users';


class List {
    constructor(){
        this.list = [];
    }

    getData(){
        fetch(API)
            .then((res) => res.json())
            .then((data) => {

                const lastId = this.list.length > 0 ? this.list[this.list.length - 1]?.id : 0;
                const updatedData = data.map((elem) => ({id: elem.id + lastId, name: elem.name}));
                console.log(updatedData);

                this.list = [...this.list, ...updatedData];

                this.updateUI(updatedData);
            })
            .catch(error => {
                throw new Error(error);
            })
    }

    updateUI(data){
        const container = document.getElementById('container');
        const fragment = document.createDocumentFragment();

        data.forEach((elem) => {
            const div = document.createElement('div');
            div.setAttribute("id", elem.id);
            div.classList.add("element");
            div.textContent = `(${elem.id}) - ${elem.name}`;

            fragment.appendChild(div);
        });

        container.appendChild(fragment);

    }
}

const myList = new List();

window.addEventListener('load', () => {
    myList.getData();
})

const container = document.getElementById('container');

container.addEventListener('scroll', () => {
    
    const bottomSpaceLeft = (
        container.scrollHeight - 
        container.scrollTop - 
        container.clientHeight
    );

    if (bottomSpaceLeft) return ;

    myList.getData();
})

// IMPORTANT:
// concept: body always occupies 100vh; the container is the one actually overflowing
// - use overflow: scroll/auto on container
// - overflow: hidden on body