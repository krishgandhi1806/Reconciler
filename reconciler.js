let vDOM=[];

function createDomElements(existingDOM, currentDOM){
    let parentElement= document.getElementById("mainArea");

    let added=0, deleted=0, updated=0;

    // Comparing new vDOM to old vDOM
    currentDOM.forEach((item)=>{
        // Checking if the element exists already in the old vDOM
        let existingItem= existingDOM.find((oldItem)=> oldItem.id === item.id);

        if(existingItem){
            updated++;
            // If it exists, update it
            let existingChild= document.querySelector(`[data-id='${item.id}']`);
            existingChild.children[0].innerHTML= item.title;
            existingChild.children[1].innerHTML= item.description;
        } else{
            added++;
            // If it doesnt exist in the DOM, create it
            let childElement= document.createElement("div");
            childElement.dataset.id = item.id; //Store the ID on the elements for future lookups

            let grandChildElement1= document.createElement("span");
            grandChildElement1.innerHTML= item.title;

            let grandChildElement2= document.createElement("span");
            grandChildElement2.innerHTML= item.description;

            let grandChildElement3= document.createElement("button");
            grandChildElement3.innerHTML= "Delete";
            grandChildElement3.setAttribute("onClick", "deleteTodo(" + item.id + ")");

            childElement.appendChild(grandChildElement1);
            childElement.appendChild(grandChildElement2);
            childElement.appendChild(grandChildElement3);
            parentElement.appendChild(childElement);
        }
    });

    // Any item left in the existing DOM array, no longer exists in the data, so remove them

    existingDOM.forEach((oldItem)=>{
        if(!currentDOM.some(item=> item.id=== oldItem.id)){
            deleted++;
            let childToRemove= document.querySelector(`[data-id='${oldItem.id}']`);
            parentElement.removeChild(childToRemove);
        }
    });

    console.log(added);
    console.log(updated);
    console.log(deleted);

}

function updateVirtualDom(data){
    let existingDOM= [...vDOM]; //Save the existing state of vDOM

    vDOM= data.map(item => {
        return {
            id: item.id,
            title: item.title,
            description: item.description, 
        }
    });

    createDomElements(existingDOM, vDOM); 
}

window.setInterval(()=> {
    let todos=[];
    for(let i=0; i<Math.floor(Math.random() * 100); i++){
        todos.push({
            title: "Go to gym",
            description: "Go to gym from 5",
            id: i+1
        })
    }

    updateVirtualDom(todos)
}, 5000);