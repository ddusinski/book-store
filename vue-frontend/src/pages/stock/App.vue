<template>
  <a href="index.html">Go to Books</a>
  <h1>Welcome to stock</h1>
  <!-- <li v-for="item in basketItems" v-bind:key="item.id">
    {{item}}
  </li> -->
  <br>
  <br>
  Stock list
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
        <td>{{ item.basketOwner.ownerName }}</td>
        <td>{{ item.basketOwner.phone }}</td>
        <td>{{ item.book.name }}</td>
        <td>{{ item.book.author }}</td>
        <td>{{ item.book.issn }}</td>
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
            <option v-for="owner in basketOwners" v-bind:key="owner.id">{{owner.ownerName}}</option>
          </select>
        </td>
        <td>{{ownerPhone}}</td>
        <td>
          <select v-model="bookName" @change="updateBookAuthorIssn(bookName)">
            <option disabled value="">Please select One Book</option>
            <option v-for="book in books" v-bind:key="book.id">{{book.name}}</option>
          </select>

        </td>
        <td>{{bookAuthor}}</td>
        <td>{{bookIssn}}</td>
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
      books: null,
      basketItems: null,
      basketOwners: null,
      ownerName: null,
      ownerPhone: null,
      bookAuthor: "testAuthor",
      bookIssn: "testIssn",
      bookCount: null
    }
  },
  methods: {
    getBasketItems() {
      fetch("http://localhost:3000/api/basketItems/findAll")
        .then(response => response.json())
        .then(response => {
          this.basketItems = response
        });
    }, getBasketOwners() {
      fetch("http://localhost:3000/api/basketOwners/findAll")
        .then(response => response.json())
        .then(response => {
          this.basketOwners = response
        });
    },
    getBooks() {
      fetch("http://localhost:3000/api/books/findAll")
        .then(response => response.json())
        .then(response => {
          this.books = response
        });
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
        .then(response => { this.status = response })
        .then(() => this.getBasketItems());
    },
    deleteBasketItem(id) {
      console.log("deleteting basketItem with ID: "+id);
      fetch("http://localhost:3000/api/basketItems/" + id, { method: "DELETE" })
        .then(response => response.json())
        .then(response => { this.status = response })
        .then(() => this.getBasketItems());
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
