app.component('review-list', {
    props: {
      reviews: {
        type: Array,
        required: true
      }
    },
    template:
    /*html*/
    `
    <div class="review-container">
    <h3>Reviews:</h3>
      <ul>
        <li v-if="reviews.length > 0" v-for="(review, index) in reviews" :key="index">
          {{ review.name }} gave this {{ review.rating }} stars :
          <br/>
          " {{ review.review }} "
          <br/>
        </li>

        <li v-else>
            No reviews yet. <br/>
            Feel free to review this product !
        </li>
      
      </ul>
    </div>
  `
  })