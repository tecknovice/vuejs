<template>
  <div>
    <div class="container">
      <div class="row">
        <aside class="col-sm-3">
          <div class="list-group">
            <router-link :to="{ name: 'Products' }" class="list-group-item">Products</router-link>
            <router-link :to="{ name: 'Users' }" class="list-group-item">Users</router-link>
          </div>
        </aside>
        <section class="col-sm-9">
          <router-view/>
        </section>
      </div>
    </div>
  </div>
</template>
