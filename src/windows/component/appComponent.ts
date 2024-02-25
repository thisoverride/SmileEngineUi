export const appComponent = () => {
    return `
    <div class="container">
        <div class="o-apps">
            <div class="c-app__tile" data-bg-color="-app-color-1"></div>
        </div>

        <div class="c-app-container">
            <div class="container">
                <div class="c-app-container__inner">
                    <div class="c-app-container__header">
                        <h1 class="c-app-container__title">This is an App</h1>
                        <button class="c-app-container__dismiss" type="button">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M16 14L2 0L0 2L14 16L0 30L2 32L16 18L30 32L32 30L18 16L32 2L30 0L16 14Z" fill="#ffffff"/>
                            </svg>
                        </button>
                    </div>
                    <div class="c-app-container__body"></div>
                </div>
            </div>
        </div>
    </div>

    <div class="c-app__holder">
        <div class="c-app -app-1">
            <h1 class="c-app__title">Application 1</h1>
            <div class="c-app__body">
                <p>test</p>
            </div>
        </div>
    </div>`;
};
