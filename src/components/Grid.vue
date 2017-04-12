<template>
  <div class="flex flex-column relative h-100 big-container">
    <!-- grid header -->
    <div class="flex-none overflow-hidden bg-near-white big-thead">
      <div class="flex flex-row nowrap relative">
        <!-- row handle -->
        <div class="flex-none db overflow-hidden ba big-td">
          <div class="db lh-1 big-th-inner light-silver tr bg-near-white" :style="'width: 60px'"></div>
        </div>

        <!-- cells -->
        <div class="flex-none db overflow-hidden ba bg-near-white tc relative big-th" v-for="c in columns">
          <div class="db big-th-inner" style="width: 130px">{{c.name}}</div>
        </div>
      </div>
    </div>

    <!-- grid body -->
    <div class="flex-fill overflow-auto">
      <div class="flex flex-row nowrap" v-for="(r, index) in rows">
        <!-- row handle -->
        <div class="flex-none db overflow-hidden ba big-td">
          <div class="db lh-1 big-td-inner light-silver tr bg-near-white" :style="'width: 60px'">{{start+index+1}}</div>
        </div>

        <!-- cells -->
        <div class="flex-none db overflow-hidden ba big-td" v-for="c in columns">
          <div class="db big-td-inner" style="width: 130px">{{r[c.name]}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  const TEST_DATA = {
    total_count: 10,
    columns: [
      { name: 'id' },
      { name: 'first_name' },
      { name: 'last_name' },
      { name: 'email' },
      { name: 'gender' },
      { name: 'ip_address' }
    ],
    rows: [{
      id: 1,
      first_name: 'Phyllis',
      last_name: 'Johnston',
      email: 'pjohnston0@drupal.org',
      gender: 'Female',
      ip_address: '210.13.57.74'
    },{
      id: 2,
      first_name: 'Billy',
      last_name: 'Olson',
      email: 'bolson1@altervista.org',
      gender: 'Male',
      ip_address: '51.200.83.232'
    },{
      id: 3,
      first_name: 'Peter',
      last_name: 'Porter',
      email: 'pporter2@ed.gov',
      gender: 'Male',
      ip_address: '214.130.223.48'
    },{
      id: 4,
      first_name: 'Alan',
      last_name: 'Chapman',
      email: 'achapman3@addtoany.com',
      gender: 'Male',
      ip_address: '105.113.204.220'
    },{
      id: 5,
      first_name: 'Amanda',
      last_name: 'Murray',
      email: 'amurray4@fda.gov',
      gender: 'Female',
      ip_address: '229.239.160.173'
    },{
      id: 6,
      first_name: 'Heather',
      last_name: 'Wood',
      email: 'hwood5@tmall.com',
      gender: 'Female',
      ip_address: '39.18.172.229'
    },{
      id: 7,
      first_name: 'Peter',
      last_name: 'Hunter',
      email: 'phunter6@is.gd',
      gender: 'Male',
      ip_address: '132.201.130.155'
    },{
      id: 8,
      first_name: 'Sean',
      last_name: 'Hamilton',
      email: 'shamilton7@fotki.com',
      gender: 'Male',
      ip_address: '128.145.63.156'
    },{
      id: 9,
      first_name: 'Juan',
      last_name: 'Castillo',
      email: 'jcastillo8@pcworld.com',
      gender: 'Male',
      ip_address: '207.133.114.80'
    },{
      id: 10,
      first_name: 'Deborah',
      last_name: 'Harper',
      email: 'dharper9@cargocollective.com',
      gender: 'Female',
      ip_address: '164.129.103.105'
    }]
  }

  const DEFAULT_COLUMN_INFO = {
    pixel_width: 130
  }

  export default {
    name: 'biggrid',
    data() {
      return {
        columns: TEST_DATA.columns,
        rows: TEST_DATA.rows,

        start: 0,
        limit: 100,
        total_row_count: TEST_DATA.total_count
      }
    }
  }
</script>

<style lang="less">
  @border-color: #ddd;

  .big-container {
    font-family: Arial, sans-serif;
    font-size: 13px;
    color: #333;
  }

  .big-thead {
    box-shadow: inset 0 -1px 0 @border-color;
  }

  .big-th,
  .big-td {
    height: 24px;
    margin-top: -1px;
    margin-left: -1px;
    border-color: @border-color;
  }

  .big-th-inner,
  .big-td-inner {
    min-width: 30px;
    max-width: 1200px;
    padding: 5px 5px 4px;
  }

  /* misc */

  .flex-fill {
    flex: 1 1;
    min-width: 0; /* 1 */
    min-height: 0; /* 1 */
  }

  .lh-1 {
    line-height: 1;
  }
</style>
