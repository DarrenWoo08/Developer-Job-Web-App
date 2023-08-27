import {
    BASE_API_URL,
    searchInputEl,
    searchFormEl,
    jobListSearchEl,
    numberEl,
    getData,
    sortingBtnRecentEl,
    sortingBtnRelevantEl,
    state
}from '../common.js';

import renderError from './Error.js';
import renderSpinner from './Spinner.js';
import renderJobList from './JobList.js';
import renderPaginationButton from './Pagination.js';

const submitHandler = async event => {
    event.preventDefault();

    const searchText = searchInputEl.value;

    const forbiddenPattern = /[0-9]/;
    const patternMatch = forbiddenPattern.test(searchText);
    if(patternMatch) {
        renderError('Error Message accured');
        return;
    }
    searchInputEl.blur();

    jobListSearchEl.innerHTML = '';

    sortingBtnRecentEl.classList.remove('sorting__button--active');
    sortingBtnRelevantEl.classList.add('sorting__button--active');

    renderSpinner('search');

    try{
        const data = await getData(`${BASE_API_URL}/jobs?search=${searchText}`);

        const { jobItems } = data;

        state.searchJobItems = jobItems;
        state.currentPage = 1;
    
        renderSpinner('search');
    
        numberEl.textContent = jobItems.length;
        
        renderPaginationButton();
        renderJobList();

    } catch (error) {
        renderSpinner('search');
        renderError(error.message)
    }
}


searchFormEl.addEventListener('submit', submitHandler);