var preview_canvas = document.getElementById('preview-canvas');
const preview_ctx = preview_canvas.getContext('2d');
var canvas = document.createElement('canvas');
canvas.setAttribute('id', 'edit-canvas');
canvas.setAttribute('width', 1920);
canvas.setAttribute('height', 1080);
const ctx = canvas.getContext('2d');
var scale, x, y;
let link = document.getElementById('img-link');

function upload_image(event){
    var download_link = "";
    let image = new Image;
    image.src = URL.createObjectURL(event.target.files[0]);
    image.onload = function() {
        console.log(image.src);
        scale = Math.max(ctx.canvas.width / image.width, ctx.canvas.height / image.height);
        x = (ctx.canvas.width - (image.width * scale)) / 2;
        y = (ctx.canvas.height - (image.height * scale)) / 2;
        ctx.drawImage(image, x, y, image.width * scale, image.height * scale);
        document.getElementById('dl-btn').disabled = false;
        
        let preview_image = new Image;
        let overlay_image = new Image;
        overlay_image.src = 'images/aa_logo.png';
        overlay_image.onload = function() {
            ctx.drawImage(overlay_image, (canvas.width / 2) - overlay_image.width / 2, (canvas.height / 2) - overlay_image.height / 2);
            link.download = 'wallpaper.png';
            canvas.toBlob(function(blob){
                link.href = URL.createObjectURL(blob);
                download_link = URL.createObjectURL(blob);
                preview_image.src = download_link;
            },'image/png');
        }

        preview_image.onload = function() {
            scale = Math.max(1358 / preview_image.width, 764 / preview_image.height);
            x = (1358 - (preview_image.width * scale)) / 2;
            y = (764 - (preview_image.height * scale)) / 2;
            preview_ctx.drawImage(preview_image, x, y, preview_image.width * scale, preview_image.height * scale);
        }
    }
    
}

function save_image() {
    console.log(1);
    canvas.toBlob(function(blob){
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', 'wallpaper.png');
        link.setAttribute('href', URL.createObjectURL(blob));
        link.click();
        URL.revokeObjectURL(blob);
    },'image/png');
}

function clear_canvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    preview_ctx.clearRect(0, 0, preview_canvas.width, preview_canvas.height);
}
