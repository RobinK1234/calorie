const ItemCtrl = (function (){
    // private
    // ItemCtrl module construct
    const Item = function (id, name, calories){
        this.id = id
        this.name = name
        this.calories = calories
    }
    // data structure
    const data = {
        items: [
            // new Item(0, 'Steak Dinner', 100),
            // new Item(1, 'Cookie', 420),
            // new Item(2, 'A egg', 119)
        ],
        total: 0,
        currentItem: null
    }


    // public methods
    return {
        logData: function (){
            return data
        },
        getTotalCalories: function (){
            let total = 0
            data.items.forEach(function (item){
                total = total + item.calories
            })
            data.total = total
            return data.total
        },
        getItems: function (){
            return data.items
        },
        addItem: function (name, calories){
            let ID;
            if(data.items.length > 0){
                ID = data.items[data.items.length - 1].id + 1
            } else {
                ID = 0
            }
            calories = parseInt(calories)
            const newItem = new Item(ID, name, calories)
            data.items.push(newItem)
            return newItem
        },
        getItem: function (id) {
            let found = null
            data.items.forEach(function(item){
                if(item.id === id){
                    found = item
                }
            })
            return found
        },
        setCurrentItem: function (item){
            data.currentItem = item
        },
        getCurrentItem: function(){
            return data.currentItem
        },
        updateItem: function (name, calories){
            let updated = null
            data.items.forEach(function (item){
                if(item.id === data.currentItem.id){
                    item.name = name
                    item.calories = parseInt(calories)
                    updated = item
                }
            })
            return updated
        },
        deleteItem: function(deletedItem){
            data.items.forEach(function (item, index){
                if(item.id === deletedItem.id){ //AAAAAAAAAAAaAAAAAAAAAAAAAAAAA
                    data.items.splice(index, 1)
                }
            })
        }
    }
})();

const UICtrl = (function (){
    const UISelectors = {
        itemList: '#item-list',
        listOfItems: '#item-list li',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        addBtn: '.add-btn',
        updateBtn: '.update-btn',
        removeBtn: '.remove-btn',
        backBtn: '.back-btn'
    }

    return{
        populateItemList: function (items){
            let html = ''
            items.forEach(function (item){
                html += `<li class="collection-item" id="item-${item.id}">
                         <strong>${item.name}:</strong> <em>${item.calories} Calories</em>
                         <a href="#" class="secondary-content">
                            <i class="edit-item fa fa-pencil"></i>
                         </a>
                         </li>`
            })
            document.querySelector(UISelectors.itemList).innerHTML = html
        },
        showTotalCalories: function (totalCalories){
            document.querySelector('.total-calories').textContent = totalCalories
        },
        getItemInput: function (){
            const userInput = {
                name: document.querySelector('#item-name').value ,
                calories: document.querySelector('#item-calories').value
            }
            return userInput
        },
        addListItem: function (item){
            const li = document.createElement('li')
            li.id = `item-${item.id}`
            li.className = 'collection-item'
            let html = `<strong>${item.name}</strong>
                            <em>${item.calories} Calories</em>
                            <a href="#" class="secondary-content">
                                <i class="edit-item fa fa-pencil"></i>
                            </a>`
            li.innerHTML = html
            document.querySelector('ul').insertAdjacentElement('beforeend', li)
        },
        clearInput: function (){
            document.querySelector('#item-name').value = ''
            document.querySelector('#item-calories').value = ''
        },
        getSelectors: function (){
            return UISelectors
        },
        showEditState: function(){
            document.querySelector(UISelectors.addBtn).style.display = 'none'
            document.querySelector(UISelectors.updateBtn).style.display = 'inline'
            document.querySelector(UISelectors.removeBtn).style.display = 'inline'
            document.querySelector(UISelectors.backBtn).style.display = 'inline'
        },
        clearEditState: function (){
        document.querySelector(UISelectors.addBtn).style.display = 'inline'
        document.querySelector(UISelectors.updateBtn).style.display = 'none'
            document.querySelector(UISelectors.removeBtn).style.display = 'none'
            document.querySelector(UISelectors.backBtn).style.display = 'none'
        },
        addItemToForm: function (){
            document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name
            document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories
            UICtrl.showEditState()
        },
        updateItem: function(item){
            let listOfItems = document.querySelectorAll(UISelectors.listOfItems)
            listOfItems.forEach(function (listItem){
                let listItemID = listItem.getAttribute('id')
                if(listItemID === `item-${item.id}`){
                    document.querySelector(`#item-${item.id}`).innerHTML = `<strong>${item.name}</strong>
                            <em>${item.calories} Calories</em>
                            <a href="#" class="secondary-content">
                                <i class="edit-item fa fa-pencil"></i>
                            </a>`
                }
            })
        },
        deleteItem: function(item){ //AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
            document.querySelector(`#item-${item.id}`).remove()
        }
    }
})()

const StorageCtrl = (function (){
    return {
        storeItem: function (item){
            let items
            if(localStorage.getItem('items') === null){
                items = []
            } else {
                items = JSON.parse(localStorage.getItem('items'))
            }
            items.push(item)
            localStorage.setItem('items', JSON.stringify(items))
        },
        getItemsFromStorage: function (){
            let items
            if(localStorage.getItem('items') === null){
                items = []
            } else {
                items = JSON.parse(localStorage.getItem('items'))
            }
            return items
        },
        updateItemInStorage: function (updatedItem){
            let items
            if(localStorage.getItem('items') === null){
                items = []
            } else {
                items = JSON.parse(localStorage.getItem('items'))
            }
            items.forEach(function (itemFromStorage, index){
                if(itemFromStorage.id === updatedItem.id){
                    items.splice(index, 1, updatedItem)
                }
            })
            localStorage.setItem('items',JSON.stringify(items))
        },
        deleteItemInStorage: function (deletedItem){ //AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
            let items
            if(localStorage.getItem('items') === null){
                items = []
            } else {
                items = JSON.parse(localStorage.getItem('items'))
            }
            items.forEach(function (itemFromStorage, index){
                if(itemFromStorage.id === deletedItem.id){
                    items.splice(index, 1)
                }
            })
            localStorage.setItem('items',JSON.stringify(items))

        }
    }
})()

const App = (function () {
    const itemAddSubmit = function (event) {
        console.log('data is submitted')
        const userInput = UICtrl.getItemInput()
        console.log(userInput)
        if (userInput.name !== '' && userInput.calories !== '') {
            const newItem = ItemCtrl.addItem(userInput.name, userInput.calories)
            UICtrl.addListItem(newItem)
            StorageCtrl.storeItem(newItem)
            const totalCalories = ItemCtrl.getTotalCalories()
            UICtrl.showTotalCalories(totalCalories)
            UICtrl.clearInput()
        }
        event.preventDefault()
    }

    const getItemsFromStorage = function () {
        const items = StorageCtrl.getItemsFromStorage()
        items.forEach(function (item) {//tšaukii
            ItemCtrl.addItem(item.name, item.calories)
        })
        UICtrl.populateItemList(items)
        const totalCalories = ItemCtrl.getTotalCalories()
        UICtrl.showTotalCalories(totalCalories)
    }
    //
    const itemEditSubmit = function (event) {
        if (event.target.classList.contains('edit-item')){
            const listID = event.target.parentNode.parentNode.id
            //console.log(parseInt(listID.split('-')[1]))
            const listIDArray = listID.split('-')
            const id = parseInt(listIDArray [1])
            const itemToEdit = ItemCtrl.getItem(id)
            ItemCtrl.setCurrentItem(itemToEdit)
            UICtrl.addItemToForm()
        }


    }
    const itemEditRemove = function (event) {
    const deletedItem = ItemCtrl.getCurrentItem()
        //console.log(deletedItem)
        ItemCtrl.deleteItem(deletedItem)
        console.log(ItemCtrl.logData())
        UICtrl.deleteItem(deletedItem)
        StorageCtrl.deleteItemInStorage(deletedItem)
        const totalCalories = ItemCtrl.getTotalCalories()
        UICtrl.showTotalCalories(totalCalories)
        UICtrl.clearInput()
        UICtrl.clearEditState()
        event.preventDefault()

    }

    const itemUpdateSubmit = function () {
        const input = UICtrl.getItemInput()
        const updatedItem = ItemCtrl.updateItem(input.name, input.calories)
        UICtrl.updateItem(updatedItem)
        StorageCtrl.updateItemInStorage(updatedItem)
        const totalCalories = ItemCtrl.getTotalCalories()
        UICtrl.showTotalCalories(totalCalories)
        UICtrl.clearInput()
        UICtrl.clearEditState()
        event.preventDefault()
    }

    const loadEventListeners = function (){
        const UISelectors = UICtrl.getSelectors()
        UICtrl.clearEditState()

        document.addEventListener('DOMContentLoaded', getItemsFromStorage)
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit)
        document.querySelector(UISelectors.itemList).addEventListener('click', itemEditSubmit)
        document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit)
        document.querySelector(UISelectors.removeBtn).addEventListener('click',itemEditRemove)
    }

    return{
        init: function (){
            loadEventListeners()
        }
    }
})(ItemCtrl, UICtrl, StorageCtrl)

App.init()

