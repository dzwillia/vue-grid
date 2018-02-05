<template>
  <div>
    <div class="lh-copy f6 ma3">{{description}}.</div>
    <div class="lh-copy f6 ma3">Created by: <a href="https://www.twitter.com/padredaveo" class="blue">David Z. Williams</a></div>
    <div class="bb b--black-20 mh3 mb3"></div>
    <a
      class="flex flex-row items-center no-underline truncate link f5 fw6 pa3 sidebar-link"
      style="outline: none"
      href="https://github.com/dzwillia/vue-grid/tree/master"
      rel="noopener"
      target="_blank"
    >
      <span class="mr3">Getting Started</span>
      <svg fill="#555555" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
      </svg>
    </a>
    <router-link v-for="item in navItems" :to="item.route" class="db no-underline truncate link f5 fw6 pa3">
      {{item.name}}
    </router-link>
  </div>
</template>

<script>
  import {
    description
  } from '../package.json'

  const navItems = [
    {
      route: 'interactions',
      name: 'Interactions'
    }
  ]

  export default {
    name: 'app',
    data () {
      return {
        navItems
      }
    },
    computed: {
      description () {
        return description
      }
    }
  }
</script>

<style>
  .sidebar-link,
  .router-link {
    color: #555;
  }

  .sidebar-link:hover,
  .router-link:hover {
    background-color: rgba(0,0,0,0.05);
  }

  .router-link-active {
    background-color: rgba(0,0,0,0.05);
    color: #357edd;
  }
</style>
