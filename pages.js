/**
* @author CosmoLite <CosmoLite#4444>
*/
class Pages {
    
    /**
    * Create a new Page object with the given elements and number of elements per pages.
    * @param {Array} elements
    * @param {Number} elementsPerPages
    */
    constructor(elements, elementsPerPages) {
        this.elements = elements;
        this.elementsPerPages = elementsPerPages;
        this.currentPage = 0;
        this.maxPage = Math.ceil(this.elements.length / this.elementsPerPages);
        this.generatePages();
    }
    
    /**
    * Generate all the pages needed.
    * @returns {Map} generated pages.
    */
    generatePages() {
        let pages = new Map();
        this.maxPage = Math.ceil(this.elements.length / this.elementsPerPages);
        for (let p = 0; p < this.maxPage; p++)
        pages.set(p, this.elements.slice((p*this.elementsPerPages), (p * this.elementsPerPages) + this.elementsPerPages));
        this.pages = pages;
    }
    
    /**
    * Change the current page to the one given.
    * @param {Number} page index
    * @returns {Pages} this
    */
    goto(page) {
        if (page >= this.pages.size) this.currentPage = this.pages.size-1;
        else if (page <= 0) this.currentPage = 0;
        else this.currentPage = page;
        return this;
    }
    
    /**
    * Change the current page for the next one.
    * @returns {Pages} this
    */
    next() {
        if (++this.currentPage >= this.pages.size) this.currentPage--;
        return this;
    }
    
    /**
    * Change the current page for the previous one.
    * @returns {Pages} this
    */
    previous() {
        if (--this.currentPage < 0) this.currentPage++;
        return this;
    }
    
    /**
    * Returns an array of the elements from the current page.
    * @returns {Array} current page elements.
    */
    getPageElements() {
        return this.pages.get(this.currentPage);
    }
    
    /**
    * Change the current elements by those given and regenerate the pages
    * @param {Array} elements
    * @returns {Pages} this
    */
    setElement(elements) {
        this.elements = elements;
        this.generatePages();
        return this;
    }
    
    /**
    * Change the number of elements per current page by the given one and regenerate the pages
    * @param {Number} elementsPerPages how many elements there will be per pages.
    * @returns {Pages} this
    */
    setMaxElementsPerPages(elementsPerPages) {
        this.elementsPerPages = elementsPerPages;
        this.generatePages();
        return this;
    }
    
    /**
    * Adds an element to the elements array.
    * @param {Object} element to push.
    */
    addElement(element) {
        this.elements.push(element);
        this.generatePages();
        return this;
    }
    
    /**
    * Removes an element at the given index of the elements array.
    * @param {Number} index of the element.
    */
    removeElement(index) {
        if (index >= this.elements.length || index < 0) return this;
        this.elements.splice(index, 1);
        this.generatePages();
        return this;
    }
    
    /**
    * Returns the element at the given index of elements array.
    * @param {Number} index of the element.
    */
    getElement(index) {
        if (index >= this.elements.length) return this.elements[this.elements.length - 1];
        if (index < 0) return this.elements[0];
        return this.elements[index];
    }
    
    /**
    * Returns the element at the given index of the given page.
    * @param {Number} page where the element will be taken.
    * @param {Number} index of the element.
    */
    getElementOfPage(page, index) {
        let returnPageIndex = page;
        if (page >= this.maxPage) returnPageIndex = this.maxPage - 1;
        if (page < 0) returnPageIndex = 0;
        let returnElementIndex = this.pages.get(returnPageIndex).length;
        if (index >= this.pages.get(returnPageIndex).length) returnElementIndex = this.pages.get(returnPageIndex).length -1;
        if (index <= 0) returnElementIndex = 0;
        return this.pages.get(returnPageIndex)[returnElementIndex];
    }
}