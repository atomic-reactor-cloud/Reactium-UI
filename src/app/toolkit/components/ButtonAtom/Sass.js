const Sass = () => {
    return `// color-left, color-right, color, text-shadow
$buttons: (
    'primary': (
        lighten($color-blue, 5%),
        $color-blue,
        $color-white,
        rgba($color-white, 0),
    ),
    'secondary': (
        lighten($color-black, 15%),
        $color-black,
        $color-grey-light,
        rgba($color-white, 0),
    ),
    'tertiary': (
        $color-gray,
        $color-gray,
        $color-white,
        rgba($color-white, 0),
    ),
    'danger': (
        lighten($color-red, 5%),
        $color-red,
        $color-white,
        rgba($color-white, 0),
    ),
    'clear': (
        rgba($color-white, 0),
        rgba($color-white, 0),
        $color-gray,
        rgba($color-white, 0),
    ),
    'info': (
        lighten($color-blue, 5%),
        $color-blue,
        $color-white,
        rgba($color-white, 0),
    ),
    'success': (
        lighten($color-green, 5%),
        $color-green,
        $color-white,
        rgba($color-white, 0),
    ),
    'warning': (
        lighten($color-orange, 15%),
        $color-orange,
        $color-white,
        rgba($color-white, 0),
    ),
    'default': (
        darken($color-white, 2%),
        darken($color-white, 2%),
        $color-grey,
        rgba($color-white, 0),
    ),
    'error': (
        lighten($color-red, 5%),
        $color-red,
        $color-white,
        rgba($color-white, 0),
    ),
) !default;

// font-size, paddingTop, paddingRight, paddingBottom, paddingLeft
$button-sizes: (
    'xs': (
        10px,
        5px,
        16px,
        4px,
        16px,
    ),
    'sm': (
        12px,
        8px,
        24px,
        8px,
        24px,
    ),
    'md': (
        14px,
        12px,
        56px,
        12px,
        56px,
    ),
    'lg': (
        22px,
        16px,
        80px,
        16px,
        80px,
    ),
) !default;`;
};

export default Sass;
