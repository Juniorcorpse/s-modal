/* ### Modal Class ###
 * Author: Robson Suzin
 * Using jQuery
 *
 * modalname = Nome para a modal
 * modaltype = Ex.: info delete delete_photo ( Atribui os estilos padrões da modal )
 * modalhtml = Ex.: Conteúdo HTML da Modal
 * modalwidth = Qual será o tamanho da modal - Padrão 500px
 *
 * modaldata = Data() que estavam armazenados no objeto do evento
 * modaldatainsert = Qual objeto vai receber os data()
 *
 * sadddata = Adiciona Data Ex.: elemento::data==valor|elemento::data==valor
 * sremovedata = Remover Data Ex.: elemento::data|elemento::data
 * saddattr = Adiciona Atributos Ex.: elemento::attr==valor|elemento::attr==valor
 * sremoveattr = Remover Atributos Ex.: elemento::attr==valor|elemento::attr==valor
 * saddhtml = Adiciona Html Ex.: elemento::valor|elemento::valor
 * saddclass = Adicionar Class Ex.: elemento::class|elemento::class
 * sremoveclass = Remove Class Ex.: elemento::class|elemento::class
 * sremoveelement = Remove Class Ex.: elemento|elemento
 *
 */
(function ($) {
    $.fn.smodal = function (options) {

        thisClass = this;

        effecttime = 200;

        if (options.modalhtml) {
            defaulthtml = '<div class="app_modal ' + (options.modalname ? options.modalname : 'app_modal_dialog') + '" s-modalclose="true">' +
                '<div class="app_modal_box">' + options.modalhtml + '</div></div>';
        } else {
            defaulthtml = '<div class="app_modal ' + (options.modalname ? options.modalname : 'app_modal_dialog') + '" s-modalclose="true">' +
                '<div class="app_modal_box">' +
                '<span><a class="app_modal_close rounded icon-times icon-notext transition" s-modalclose="true" href="#"></a></span>' +
                '<p class="js-icon icon-notext al-center"></p>' +
                '<p class="js-title title"></p>' +
                '<div class="flex" >' +
                '<a class="js-cancel btn btn-normal radius transition" s-modalclose="true" href="#">' +
                'Cancelar' +
                '</a>' +
                '<a class="js-confirm btn btn-normal radius transition" s-modalclose="true" href="#" >' +
                'Confirmar' +
                '</a></div></div></div>';
        }

        defaults = {
            'modalname': 'app_modal_dialog',
            'modaltype': '',
            'modalhtml': defaulthtml,
            'modalwidth': 500,
            'modaldatainsert': 'js-confirm'
        };

        settings = $.extend({}, defaults, options);

        if (typeof modalname === 'undefined') {
            modalname = [];
            modalname.unshift({name: settings.modalname});
        } else {
            if (modalname.length === 0) {
                modalname.unshift({name: settings.modalname});
            } else {
                $.each(modalname, function (key, value) {
                    if (value['name'] !== settings.modalname) {
                        modalname.unshift({name: settings.modalname});
                    }
                });
            }

        }

        this.addhtml = function (e, obj) {
            $.each(obj, function (key, value) {
                e.html(value);
            });
        };

        this.adddata = function (e, obj) {
            $.each(obj, function (key, value) {
                if (key.indexOf("-") === -1) {
                    key = 'data-' + key;
                }
                e.attr(key, value);
            });
        };

        this.removedata = function (e, obj) {
            $.each(obj, function (key, value) {
                if (key.indexOf("-") === -1) {
                    value = 'data-' + value;
                }
                e.removeAttr(value);
            });
        };

        this.addattr = function (e, obj) {
            $.each(obj, function (key, value) {
                e.attr(key, value);
            });
        };

        this.removeattr = function (e, obj) {
            $.each(obj, function (key, value) {
                e.removeAttr(value);
            });
        };

        this.addclass = function (e, obj) {
            $.each(obj, function (key, value) {
                e.addClass(value);
            });
        };

        this.removeclass = function (e, obj) {
            $.each(obj, function (key, value) {
                e.removeClass(value);
            });
        };

        this.removeelement = function (e) {
            e.remove();
        };

        this.addcss = function (e, obj) {
            $.each(obj, function (key, value) {
                obj[key] = value;
                e.css(obj);
            });
        };

        this.setInfo = function () {
            defaultremoveattr = 'js-confirm::data-post';
            thisClass.setProperties(defaultremoveattr, 'removeattr');

            defaultaddhtml = 'js-confirm::Editar|js-cancel::OK';
            thisClass.setProperties(defaultaddhtml, 'addhtml');

            defaultaddclass = 'js-confirm::btn-blue|js-confirm::icon-pencil|js-cancel::btn-green|js-cancel::icon-check|js-icon::color-blue|js-icon::icon-info';
            thisClass.setProperties(defaultaddclass, 'addclass');
        };

        this.setDelete = function () {
            defaultaddhtml = 'js-confirm::Apagar|js-cancel::Cancelar';
            thisClass.setProperties(defaultaddhtml, 'addhtml');

            defaultaddclass = 'js-confirm::btn-red|js-confirm::icon-trash|js-cancel::btn-default|js-cancel::icon-ban|js-icon::color-yellow|js-icon::icon-warning';
            thisClass.setProperties(defaultaddclass, 'addclass');
        };

        this.setProperties = function (s, f) {
            if (!s) {
                return;
            }

            s = s.split('|');

            $.each(s, function (key, value) {
                obj = value.split('::');

                element = $('.' + obj[0]);
                elementObj = thisClass.objSplit(obj[1]);

                switch (f) {
                    case "adddata":
                        thisClass.adddata(element, elementObj);
                        break;
                    case "removedata":
                        thisClass.removedata(element, elementObj);
                        break;
                    case "addclass":
                        thisClass.addclass(element, elementObj);
                        break;
                    case "removeclass":
                        thisClass.removeclass(element, elementObj);
                        break;
                    case "addattr":
                        thisClass.addattr(element, elementObj);
                        break;
                    case "removeattr":
                        thisClass.removeattr(element, elementObj);
                        break;
                    case "removeelement":
                        thisClass.removeelement(element, elementObj);
                        break;
                    case "addhtml":
                        thisClass.addhtml(element, elementObj);
                        break;
                    case "addcss":
                        thisClass.addcss(element, elementObj);
                        break;
                }
            });
        };

        this.objSplit = function (v, c = '::') {

            if (!v) {
                return;
            }
            s = v.split(c);

            split_value = null;
            s_obj = Object();
            $.each(s, function (key, value) {
                split_value = value.split('==');
                if (split_value[1]) {
                    s_obj[split_value[0]] = split_value[1];
                } else {
                    s_obj[key] = split_value[0];
                }
            });

            return s_obj;
        };

        this.show = function () {

            objmodalname = $('.' + modalname[0]['name']);

            box = objmodalname.children();

            objmodalname.fadeIn(effecttime).css("display", "flex");

            box.css('width', '0');
            box.animate({"width": (settings.modalwidth + 20) + "px"}, effecttime);
            box.animate({"width": (settings.modalwidth) + "px"}, effecttime - 150);
        };

        this.close = function () {
            $("[s-modalclose]").click(function (e) {
                if (e.target === this) {

                    objmodalname = $('.' + modalname[0]['name']);
                    box = objmodalname.children();
                    box.animate({"width": "250px"}, effecttime);
                    objmodalname.fadeOut(effecttime, function () {

                        if (box.length === 1 && (modalname[0]['name'] === 'app_modal_dialog' || options.modalhtml)) {
                            objmodalname.remove();
                            modalname.splice(0, 1);
                        }
                    });

                }
            });
        };


        return this.each(function () {

            if (settings.modalname === 'app_modal_dialog' || options.modalhtml) {
                $('body').prepend(defaulthtml);
            }

            if (settings.modaltype) {
                if (settings.modaltype === 'info') {
                    thisClass.setInfo();
                }

                if (settings.modaltype === 'delete' || settings.modaltype === 'delete_photo') {
                    thisClass.setDelete();
                }
            }

            if (settings.saddhtml) {
                thisClass.setProperties(settings.saddhtml, 'addhtml');
            }
            if (settings.sadddata) {
                thisClass.setProperties(settings.sadddata, 'adddata');
            }
            if (settings.sremovedata) {
                thisClass.setProperties(settings.sremovedata, 'removedata');
            }
            if (settings.saddattr) {
                thisClass.setProperties(settings.saddattr, 'addattr');
            }
            if (settings.sremoveattr) {
                thisClass.setProperties(settings.sremoveattr, 'removeattr');
            }
            if (settings.saddclass) {
                thisClass.setProperties(settings.saddclass, 'addclass');
            }
            if (settings.sremoveclass) {
                thisClass.setProperties(settings.sremoveclass, 'removeclass');
            }
            if (settings.sremoveelement) {
                thisClass.setProperties(settings.sremoveelement, 'removeelement');
            }
            if (settings.saddcss) {
                thisClass.setProperties(settings.saddcss, 'addcss');
            }
            if (settings.modaldata) {
                thisClass.adddata($('.' + settings.modaldatainsert), settings.modaldata);
            }

            thisClass.show();
            thisClass.close();

        });


    }
})(jQuery);