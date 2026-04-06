(function () {
    try {
        var theme = localStorage.getItem('theme');
        var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches === true;
        if (!theme && supportDarkMode) theme = 'dark';
        if (!theme) theme = 'light';
        document.documentElement.setAttribute('data-theme', theme);
    } catch (e) { }
})();
