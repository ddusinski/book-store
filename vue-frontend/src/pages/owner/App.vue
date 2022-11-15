<template>
  <li>
    <ul><a href="index.html">Go to Index</a></ul>
    <ul><a href="book.html">Go to Books</a></ul>
    <ul><a href="stock.html">Go to Stock</a></ul>
  </li>
  <h1>Welcome to basketOwner</h1>
  <br>
  <br>
  <div class="basket-owner-list">
    <p>status is: {{ status }}</p>
    <table class="table">
      <tr>
        <th>Index</th>
        <th>Owner phone</th>
        <th>Owner name</th>
      </tr>
      <tr v-for="owner in basketOwners" v-bind:key="owner.phone">
        <td>{{ owner.id }}</td>
        <td>{{ owner.phone }}</td>
        <td>{{ owner.ownerName }}</td>
        <td>
          <button @click="deleteBasketOwner(owner.phone)">Delete Basket Owner</button>
        </td>
      </tr>
      <tr>
        <td>New:</td>
        <td><input type="number" id="ownerPhone" v-model="ownerPhone"></td>
        <td><input type="text" id="ownerName" v-model="ownerName"></td>
        <td>
          <button v-on:click="addBasketowner">Add basket owner</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "basket-owner-component",
  data() {
    return {
      status: "null",
      basketOwners: null,
      ownerName: "",
      ownerPhone: null
    }
  },
  methods: {
    getBasketOwners() {
      fetch("http://localhost:3000/api/basketOwners/findAll")
        .then(ownerResponse => ownerResponse.json())
        .then(ownerResponse => { this.basketOwners = ownerResponse })
    },
    addBasketowner() {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "ownerName": this.ownerName, "phone": this.ownerPhone })
      }
      fetch("http://localhost:3000/api/basketOwners/", requestOptions)
        .then(response => response.json())
        .then(() => { this.cleanBasketOwnerForm(); this.getBasketOwners() });
    },
    deleteBasketOwner(id) {
      console.log("deleteting basketOwner with ID: " + id);
      fetch("http://localhost:3000/api/basketOwners/" + id, { method: "DELETE" })
        .then(response => response.json())
        .then(() => {
          this.cleanBasketOwnerForm();
          this.getBasketOwners()
        });
    },
    cleanBasketOwnerForm() {
      this.ownerName = null;
      this.ownerPhone = null;
    }
  },
  created() {
    this.getBasketOwners();
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