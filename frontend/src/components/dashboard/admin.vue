<template>
    <div>
      Admin works

      <table class="table table-success table-striped">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">FirstName</th>
      <th scope="col">LastName</th>
      <th scope="col">Email</th>
     <th scope="col">supprimer</th>
     <th scope="col">modifier</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
      <button> supprimer</button>

    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry the Bird</td>
         <td>Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>
    </div>
</template>
<script>
export default {
    name: 'Admin'
}
</script>