$(function () {
    var googleSearchUrlPattern = /^https?:\/\/(?:www\.)?google\.[a-z.]+\//i
    if (!googleSearchUrlPattern.test(window.location.href)) {
        return
    }

    var $search = $('#search')
    if (!$search.length) {
        return
    }

    var $results = $('#search div.g')
    var $container = $results.last()
    if ($container.length > 0) {
        $container.after('<div id="cc"></div>')
    } else {
        $search.append('<div id="cc"></div>')
    }

    var s = $('#cc')

    $('div i > a').each(function (i, a) {
        if (!a || !a.href || /google\.com\/support\//.test(a.href)) {
            return
        }

        setTimeout(function () {
            $.ajax({
                type: 'GET',
                url: a.href,
                dataType: 'html',
                success: function (data) {
                    var hm = {}
                    var links = (data || '').matchAll(/class="infringing_url">([^<]+?)\s*-\s*([0-9]+)/g)

                    for (const i of links) {
                        var rawDomain = (i[1] || '').trim()
                        var normalizedDomain = rawDomain.replace(/^https?:\/\//i, '').replace(/\/.*$/, '')
                        if (!normalizedDomain || normalizedDomain in hm) {
                            continue
                        }

                        hm[normalizedDomain] = 1
                        var count = i[2]
                        var l = $('#l' + count)
                        if (l.length < 1) {
                            s.prepend('<div id="l' + count + '" data-num="' + count + '"></div>')
                            l = $('#l' + count)
                        }

                        var href = /^https?:\/\//i.test(rawDomain) ? rawDomain : 'http://' + normalizedDomain
                        l.append('<div class="g">'
                            + '<a href="' + href + '" target="_blank">' + normalizedDomain + ' (' + count + ' URLs) </a>'
                            + '</div>')
                    }

                    var divs = $('div[data-num]', s)
                    divs.sort(function (a, b) {
                        return b.dataset.num - a.dataset.num
                    })
                    s.html(divs)
                },
                error: function (e, err) {
                    console.log(e, err)
                },
                xhr: function () {
                    var xhr = jQuery.ajaxSettings.xhr();
                    var setRequestHeader = xhr.setRequestHeader;
                    xhr.setRequestHeader = function (name, value) {
                        if (name == 'X-Requested-With') return;
                        setRequestHeader.call(this, name, value);
                    }
                    return xhr;
                }
            })
        }, i * 2000)
    })
})

