/**
 * Created by jack on 16/6/4.
 */

fis.set("path","/static/apps/paiban");


fis.hook("module",{
    mode:"mod"
});

fis.match("components/**", {
    isMod:true,
    release:fis.get("path") +"/static/$0"
});

fis.match("component_modules/*.js",{
    isMod:true,
    useMap:true,
    release:fis.get("path")+"/static/$0"
});

fis.match(/^\/components\/component\/(.*)$/i, {
    id : '$1',
    useHash:false
});

fis.match("components/page/(*.html)",{
    release: fis.get("path")+'/$1',
    useCache : false
});

fis.match("/static/**/*.*",{
    useHash:false,
    release:fis.get("path")+"/$0"
});


fis.match('::packager', {
    postpackager: fis.plugin('loader', {
        resourceType: 'mod',
        useInlineMap: true
    }),
    packager: fis.plugin('map'),
    spriter: fis.plugin('csssprites', {
        layout: 'matrix',
        margin: '15'
    })
}).match('**/*.css', {
    packTo: '/static/pkg/all.css'
});


fis.media('prod')
    .match('component_modules/*.js',{
        packTo: '/static/pkg/common.js'
    })
    .match('components/**/*.js',{
        packTo: '/static/pkg/app.js'
    })
    .match('/static/pkg/*.css', {
        optimizer: fis.plugin('clean-css')
    })
    .match('/static/pkg/**',{
        useHash:true
    });