<template>
  <li>
    <ul><a href="index.html">Go to Index</a></ul>
    <ul><a href="book.html">Go to Books</a></ul>
  </li>
  <h1>Welcome to stock</h1>
  <!-- <li v-for="item in basketItems" v-bind:key="item.id">
    {{item}}
  </li> -->

  <!-- <li v-for="owner in basketOwners" v-bind:key="owner.id">
    <ul> owner - {{ owner.ownerName }}</ul>
  </li> -->
  <!-- <h1>{{ this.basketOwners }}</h1> -->

  <!-- <option v-for="owner in basketOwners" v-bind:key="owner.id">{{ owner.ownerName }}</option> -->
  <br>
  <br>
  Stock list
  <!-- <br>the name of the owner is: {{ownerName}}
  <br>all basket owners are: {{basketOwners}} -->

  <div class="basket-item-list">
    <p>status is: {{ status }}</p>
    <table class="table">
      <tr>
        <th>Index</th>
        <th>Owner name</th>
        <th>Owner phone</th>
        <th>Book title</th>
        <th>Book author</th>
        <th>Book issn</th>
        <th>Order book count</th>
        <th>Action</th>
      </tr>
      <tr v-for="item in basketItems" v-bind:key="item.id">

        <td>{{ item.id }}</td>
        <td v-if="item.basketOwner">{{ item.basketOwner.ownerName }}</td>
        <td v-if="item.basketOwner">{{ item.basketOwner.phone }}</td>
        <td v-if="item.book">{{ item.book.name }}</td>
        <td v-if="item.book">{{ item.book.author }}</td>
        <td>{{ item.bookIssn }}</td>
        <td>{{ item.count }}</td>
        <td>
          <button @click="deleteBasketItem(item.id)">Delete Item</button>
        </td>
      </tr>
      <tr>
        <td>New:</td>
        <td>
          <select v-model="ownerName" @change="updateOwnerPhone(ownerName)">
            <option disabled value="">Please select One User</option>
            <option v-for="owner in basketOwners" v-bind:key="owner.id">{{ owner.ownerName }}</option>
          </select>
        </td>
        <td>{{ ownerPhone }}</td>
        <td>
          <select v-model="bookTitle" @change="updateBookAuthorIssn(bookTitle)">
            <option disabled value="">Please select One Book</option>
            <option v-for="book in books" v-bind:key="book.id">{{ book.name }}</option>
          </select>
        </td>
        <td>{{ bookAuthor }}</td>
        <td>{{ bookIssn }}</td>
        <td><input type="text" id="bookCount" v-model="bookCount"></td>
        <td>
          <button v-on:click="addBasketItem">Add basket item</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "stock-component",
  data() {
    return {
      status: "null",
      books: null,
      basketItems: null,
      basketOwners: null,
      ownerName: "",
      ownerPhone: 0,
      bookAuthor: "",
      bookTitle: "",
      bookIssn: "",
      bookCount: 0
    }
  },
  methods: {
    getBasketItems() {
      fetch("http://localhost:3000/api/basketItems/findAll")
        .then(basketItemResponse => basketItemResponse.json())
        .then(data => {
          console.log(data);
          this.basketItems = data;
        })
    },
    getBasketOwners() {
      fetch("http://localhost:3000/api/basketOwners/findAll")
        .then(ownerResponse => ownerResponse.json())
        .then(ownerResponse => { this.basketOwners = ownerResponse })
    },
    getBooks() {
      fetch("http://localhost:3000/api/books/findAll")
        .then(bookResponse => bookResponse.json())
        .then(data => {
          this.books = data;
        })
    },
    updateOwnerPhone(userName) {
      var selectedUser = this.basketOwners.filter(obj => { return obj.ownerName === userName });
      this.ownerPhone = selectedUser[0].phone;
    },
    updateBookAuthorIssn(bookTitle) {
      var selectedBook = this.books.filter(b => { return b.name === bookTitle });
      this.bookAuthor = selectedBook[0].author;
      this.bookIssn = selectedBook[0].issn;
    },
    addBasketItem() {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "issn": this.bookIssn, "ownerName": this.ownerName, "count": this.bookCount })
      }
      fetch("http://localhost:3000/api/basketItems/", requestOptions)
        .then(response => response.json())
        .then(() => { this.cleanBasketItemForm(); this.getBasketItems() });
    },
    deleteBasketItem(id) {
      console.log("deleteting basketItem with ID: " + id);
      fetch("http://localhost:3000/api/basketItems/" + id, { method: "DELETE" })
        .then(response => response.json())
        .then(() => {
          this.cleanBasketItemForm();
          this.getBasketItems()
        });
    },
    cleanBasketItemForm() {
      this.getBasketItems();
      this.ownerName = null;
      this.ownerPhone = null;
      this.bookAuthor = null;
      this.bookIssn = null;
      this.bookCount = null;
      this.bookTitle = null;
    }
  },
  created() {
    this.getBasketItems();
    this.getBasketOwners();
    this.getBooks();
  }
}
</script>

<style scoped>
.table,
th,
td {
  border: 1px solid;
}
</style>
