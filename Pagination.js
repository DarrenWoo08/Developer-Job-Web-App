import {
    state,
    paginationEl,
    RESULTS_PER_PAGE,
    paginationNumberBackEl,
    paginationNumberNextEl,
    paginationBtnNextEl,
    paginationBtnBackEl
} from '../common.js';

import renderJobList from './JobList.js';

const renderPaginationButton = () => {
    if(state.currentPage > 1) {
        paginationBtnBackEl.classList.remove('pagination__button--hidden');
    } else {
        paginationBtnBackEl.classList.add('pagination__button--hidden');
    }

    if((state.searchJobItems.length - state.currentPage * RESULTS_PER_PAGE) <= 0) {
        paginationBtnNextEl.classList.add('pagination__button--hidden');
    } else {
        paginationBtnNextEl.classList.remove('pagination__button--hidden');
    }

    paginationNumberBackEl.textContent = state.currentPage - 1;
    paginationNumberNextEl.textContent = state.currentPage + 1;

    paginationBtnNextEl.blur();
    paginationBtnBackEl.blur();
}


const clickHandler = event => {
    const clickedButtonEl = event.target.closest('.pagination__button');

    if (!clickedButtonEl) return;

    const nextPage = clickedButtonEl.className.includes('--next') ? true : false;
    
    nextPage ? state.currentPage++ : state.currentPage--;

    renderPaginationButton();

    renderJobList();
}

paginationEl.addEventListener('click', clickHandler);

export default renderPaginationButton;