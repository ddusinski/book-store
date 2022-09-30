<style scoped>
.table,
th,
td {
  border: 1px solid;
}
</style>
<template>
  <a href="stock.html">Go to Stock</a>
  <h1>Welcome to books</h1>
  <div class="book-list">
    <p>status is: {{ status }}</p>
    <table class="table">
      <tr>
        <th>Index</th>
        <th>ISSN</th>
        <th>Name</th>
        <th>Author</th>
        <th>Edit</th>
      </tr>
      <tr v-for="(book, index) in books" :key="book.issn">
        <td>{{ index }}</td>
        <td>{{ book.issn }}</td>
        <td>{{ book.name }}</td>
        <td>{{ book.author }}</td>
        <td>
          <button @click="deleteBook(book.issn)">Delete</button>
        </td>
      </tr>
      <tr>
        <td>New:</td>
        <td><input type="number" id="issn" v-model="issn"></td>
        <td><input type="text" id="name" v-model="bookName"></td>
        <td><input type="text" id="author" v-model="bookAuthor"></td>
        <td>
          <button v-on:click="addBook">Add</button>
        </td>
      </tr>
    </table>
  </div>

</template>
  
<script>
// import { response } from 'express';

export default {
  name: "book-component",
  data() {
    return {
      books: null,
      bookName: "",
      bookAuthor: "",
      issn: "",
      status: ""
    };
  },
  methods: {
    addBook() {
      if (this.bookName && this.bookAuthor) {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ "name": this.bookName, "author": this.bookAuthor, "issn": this.issn })
        };
        fetch("http://localhost:3000/api/books/", requestOptions)
          .then(response => response.json())
          .then(response => { this.status = response })
          .then(() => this.getAllBooks());
      } else { this.status = "please fill Book name and author" }
    },
    getAllBooks() {    // Simple GET request using fetch
      fetch("http://localhost:3000/api/books/findAll")
        .then(response => response.json())
        .then(response => {
          this.books = response
        });

    },
    deleteBook(id) {
      console.log("ID: " + id);
      fetch("http://localhost:3000/api/books/" + id, { method: "DELETE" })
        .then(response => response.json())
        .then(response => { this.status = response })
        .then(() => this.getAllBooks());
    }
  },
  created() {
    this.getAllBooks();
  }
};
</script>