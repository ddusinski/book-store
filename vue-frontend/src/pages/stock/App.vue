<template>
  <a href="index.html">Go to Books</a>
  <h1>Welcome to stock</h1>
  <li v-for="item in books" v-bind:key="item.issn">
    {{item}}
  </li>
  <br>
  <br>
  Stock list
  <div class="stock-list">
    <p>status is: {{ status }}</p>
    <table class="table">
      <tr>
        <th>Index</th>
        <th>Stock Count</th>
        <th>Book</th>
      </tr>
      <tr v-for="(book, index) in books" :key="book.issn">
        <td>{{ index }}</td>
        <!-- <td>{{ stock. }}</td> -->
        <td>
          <!-- <button @click="deleteBook(book.issn)">Delete</button> -->
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


export default {
  name: "stock-component",
  data() {
    return {
      books: null
    }
  },
  methods: {
    getAllBooks() {
      fetch("http://localhost:3000/api/books/findAll")
        .then(response => response.json())
        .then(response => {
          this.books = response
        });
    }
  },
  created() {
    this.getAllBooks();
  }
}
</script>


