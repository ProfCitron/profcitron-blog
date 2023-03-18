<script>
    export let link;
    export let text;
    export let theme = 'blue';

    let colors = {
        'blue' : {
            bgColor: 'bg-klein-blue',
            textColor: 'text-white',
            hoverBgColor: 'hover:bg-french-sky-blue',
            hoverTextColor: 'hover:text-klein-blue'
        },
        'red' : {
            bgColor: 'bg-ribbon-red',
            textColor: 'text-white',
            hoverBgColor: 'hover:bg-candy-pink',
            hoverTextColor: 'hover:text-klein-blue'
        },
        'yellow' : {
            bgColor: 'bg-aurora-yellow',
            textColor: 'text-white',
            hoverBgColor: 'hover:bg-naples-yellow',
            hoverTextColor: 'hover:text-klein-blue'
        },
        'lightBlue': {
            bgColor: 'bg-klein-blue',
            textColor: 'text-white',
            hoverBgColor: 'hover:bg-white',
            hoverTextColor: 'hover:text-klein-blue'
        },
        'lightRed': {
            bgColor: 'bg-ribbon-red',
            textColor: 'text-white',
            hoverBgColor: 'hover:bg-white',
            hoverTextColor: 'hover:text-klein-blue'
        },
        'lightYellow': {
            bgColor: 'bg-klein-blue',
            textColor: 'text-white',
            hoverBgColor: 'hover:bg-white',
            hoverTextColor: 'hover:text-klein-blue'
        },
    };

    let color = colors[theme];
</script>

<a href="{link}" class="custom-button custom-shadow inline-block px-6 py-3 font-poppins font-semibold {color.hoverBgColor} {color.hoverTextColor} {color.bgColor} {color.textColor}">
    {text}
</a>

<style>
    .custom-shadow {
        box-shadow: 4px 4px #151515;
    }

    .custom-button {
        position: relative;
        transition: all 0.2s;
        transition-timing-function: cubic-bezier(.4,0,.2,1);
    }

    .custom-button:hover {
        transform: translateX(4px) translateY(4px);
        box-shadow: 0 0 #151515;
    }
</style>