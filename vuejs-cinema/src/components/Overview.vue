<template>
    <div id="overview">
        <day-select v-bind:selected="day"></day-select>
        <div class="main">
            <movie-list v-bind:genre="genre" v-bind:time="time" v-bind:movies="movies" v-bind:day="day"></movie-list>
            <movie-filter></movie-filter>
        </div>
    </div>
</template>
<script>
    import DaySelect from './DaySelect.vue';
    import MovieList from './MovieList.vue';
    import MovieFilter from './MovieFilter.vue';
    
    export default {
        components: {
            DaySelect,
            MovieList,
            MovieFilter
        },
        props: [ 'genre', 'time', 'movies', 'day' ],
    }
</script>