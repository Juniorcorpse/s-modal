/* ### Modal Class ###
 * Author: Robson Suzin
 * Using jQuery
 *
 * Criação do HTML tem por obrigação ter um .app_modal
 *
 * Inicializa a ação no botão
 *
 * s-modal = Ex.: dialog::true ( dialog utiliza o html padrão) ou Ex.: modal::class | utilizar o modal para abrir uma modal especifica
 * s-modalhtml = Ex.: true (Mostra para o sistema que vai ser inserido um novo html)
 * s-modalwidth = Qual será o tamanho da modal - Padrão 500px
 * s-adddata = Adiciona Data Ex.: elemento::data==valor|elemento::data==valor
 * s-removedata = Remover Data Ex.: elemento::data|elemento::data
 * s-addattr = Adiciona Atributos Ex.: elemento::attr==valor|elemento::attr==valor
 * s-removeattr = Remover Atributos Ex.: elemento::attr==valor|elemento::attr==valor
 * s-addhtml = Adiciona Html Ex.: elemento::valor|elemento::valor
 * s-addclass = Adicionar Class Ex.: elemento::class|elemento::class
 * s-removeclass = Remove Class Ex.: elemento::class|elemento::class
 *
 * data-action = Ex.: delete ou info (utiliza o html pré-definido)
 *
 */
function Modal() {

    thisClass = this;
    thisElement = null;
    objattr = null;
    effecttime = 200;

    html = '';
    btndata = ''; // Se for necessário passar os parametros data do botão clicado para algum botão na modal

    data = '';

    saddhtml = '';
    sadddata = '';
    sremovedata = '';
    saddattr = '';
    sremoveattr = '';
    saddclass = '';
    sremoveclass = '';
    sremoveelement = '';
    shtml = '';
    smodal = '';

    //Initialize modal
    this.initialize = function () {


        if (thisElement) {
            saddhtml = thisElement.attr('s-addhtml');
            sadddata = thisElement.attr('s-adddata');
            sremovedata = thisElement.attr('s-removedata');
            saddattr = thisElement.attr('s-addattr');
            sremoveattr = thisElement.attr('s-removeattr');
            saddclass = thisElement.attr('s-addclass');
            sremoveclass = thisElement.attr('s-removeclass');
            sremoveelement = thisElement.attr('s-removeelement');
            shtml = thisElement.attr('s-html');

            smodal = thisClass.objSplit(thisElement.attr('s-modal'));
        } else {

            $.each(objattr, function (key, value) {
                if (key === 'action') {
                    data.action = value;
                }

                if (key === 'saddhtml') {
                    saddhtml = value;
                }
                if (key === 'sadddata') {
                    sadddata = value;
                }
                if (key === 'sremovedata') {
                    sremovedata = value;
                }
                if (key === 'saddattr') {
                    saddattr = value;
                }
                if (key === 'sremoveattr') {
                    sremoveattr = value;
                }
                if (key === 'saddclass') {
                    saddclass = value;
                }
                if (key === 'sremoveclass') {
                    sremoveclass = value;
                }
                if (key === 'sremoveelement') {
                    sremoveelement = value;
                }
                if (key === 'shtml') {
                    shtml = value;
                }
                if (key === 'smodal') {
                    smodal = thisClass.objSplit(value);
                }
            });
        }

        if (smodal[0] === 'dialog' && smodal[1] === 'true') {
            modalclass = 'app_modal_dialog';
        } else {
            modalclass = smodal[1];
        }

        if (smodal[0] === 'modal') {
            modalclass = smodal[1];
        }

        if (!html) {
            html = '<div class="app_modal ' + modalclass + '" data-modalclose="true">' +
                '<div class="app_modal_box">' +
                '<span><a class="app_modal_close rounded" data-modalclose="true" href="#">x</a></span>' +
                '<p class="js-icon icon-notext al-center"></p>' +
                '<p class="js-title title"></p>' +
                '<div class="flex" >' +
                '<a class="js-cancel btn btn-normal radius transition" data-modalclose="true" href="#">' +
                'Cancelar' +
                '</a>' +
                '<a class="js-confirm btn btn-normal radius transition" data-modalclose="true" href="#" >' +
                'Confirmar' +
                '</a>' +
                '</div>' +
                '</div>' +
                '</div>';
        }

        if (smodal[0] === 'modal') {
            if ($('.' + smodal[1]).length > 0 && smodal[1] === true) {
                $('.' + smodal[1]).remove();
            }
            if ($('.' + smodal[1]).length === 0 && smodal[1] !== true) {
                $('body').prepend(html);
            }

            if (smodal[1] === 'true') {
                appmodal = $('.app_modal_dialog');
            } else {
                appmodal = $('.' + smodal[1]);
            }
        } else {
            if (smodal[1] === 'true') {
                appmodal = $('.app_modal_dialog');
                appmodal.remove();
                $('body').prepend(html);
                appmodal = $('.app_modal_dialog');

            } else {
                appmodal = $('.' + smodal[1]);

            }
        }

        if (btndata && data) {
            thisClass.adddata($('.' + btndata), data);
        }


        if (data.action === 'info') {
            thisClass.setInfo();
        }

        if (data.action === 'delete' || data.action === 'delete_photo') {
            thisClass.setDelete();
        }

        if (data.modalwidth) {
            thisClass.setWidth(data.modalwidth);
        } else {
            thisClass.setWidth(500);
        }

        if (saddhtml) {
            thisClass.setProperties(saddhtml, 'addhtml');
        }

        if (sadddata) {
            thisClass.setProperties(sadddata, 'adddata');
        }
        if (sremovedata) {
            thisClass.setProperties(sremovedata, 'removedata');
        }
        if (saddattr) {
            thisClass.setProperties(saddattr, 'addattr');
        }
        if (sremoveattr) {
            thisClass.setProperties(sremoveattr, 'removeattr');
        }
        if (saddclass) {
            thisClass.setProperties(saddclass, 'addclass');
        }
        if (sremoveclass) {
            thisClass.setProperties(sremoveclass, 'removeclass');
        }
        if (sremoveelement) {
            thisClass.setProperties(sremoveelement, 'removeelement');
        }

        thisClass.open();

        $("[data-modalclose]").on('click', function (e) {
            if (e.target === this) {
                thisClass.close();
            }
        });
    };

    this.setInfo = function () {

        if (!sremoveattr) {
            sremoveattr = 'js-confirm::data-post';
        }

        if (!saddhtml) {
            saddhtml = 'js-confirm::Editar|js-cancel::OK';
        }

        if (!saddclass) {
            saddclass = 'js-confirm::btn-blue|js-confirm::icon-pencil|js-cancel::btn-green|js-cancel::icon-check|js-icon::color-blue|js-icon::icon-info';
        }

    };

    this.setDelete = function () {

        if (!saddhtml) {
            saddhtml = 'js-confirm::Apagar|js-cancel::Cancelar';
        }

        if (!saddclass) {
            saddclass = 'js-confirm::btn-red|js-confirm::icon-trash|js-cancel::btn-default|js-cancel::icon-ban|js-icon::color-yellow|js-icon::icon-warning';
        }
    };

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

    this.removeelement = function (e, obj) {
            e.remove();
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

    this.setWidth = function (value) {
        if (!value) {
            datamodalwidth = 500
        } else {
            datamodalwidth = value;
        }
    };

    this.sethtml = function (value) {
        html = value;
    };

    this.setbtndata = function (value) {
        btndata = value;
    };

    this.setbtnclicked = function (element) {
        thisElement = element;
        data = thisElement.data();
    };

    this.setobjattr = function (obj) {
        objattr = obj;
    };

//Open
    this.open = function () {

        thisClass.setWidth(data.modalwidth);

        box = appmodal.children();
        appmodal.fadeIn(effecttime).css("display", "flex");
        box.css('width', '0px');
        box.animate({"width": (datamodalwidth + 20) + "px"}, effecttime);
        box.animate({"width": (datamodalwidth) + "px"}, effecttime - 150);
    };

//Close
    this.close = function () {
        box = appmodal.children();
        box.animate({"width": "250px"}, effecttime);
        appmodal.fadeOut(effecttime, function () {
            if (box.length === 1) {
                appmodal.remove();
            }
        });
    };


}