# Plugin jQuery s-modal
*Author: Robson Suzin*
Using jQuery and PHP


```
Você pode passar no construtor um nome para a classe da modal ou vai atribuir a classe padrão
$modal = new \Source\Support\Smodal();

$modal->setSmodalname("modal_name_class") // Padrão app_modal_dialog ou vc pode passar uma classe para a modal 

$modal->setSmodaltype("delete") = Ex.: info delete delete_photo ( Atribui os estilos padrões da modal )

$modal->setSmodalhtml("<p>Modal</p>") = Ex.: Conteúdo HTML da Modal

$modal->setSmodalwidth(700) = Qual será o tamanho da modal - Padrão 500px - Ex: 90%

$modal->setSmodalprint('true') = true (Adiciona um botão de print)

$modal->setSmodaleffect('bounce') = Qual efeito que vai aparecer a modal, jqueryUi

$modal->setSmodaldata('js-confirm') = Qual elemento vai receber os data() do evento

$modal->setSadddata($element, $data, $value) = Adiciona Atributo Data ao $element 

$modal->setSremovedata($element, $data) = Remover Atributo Data do $element 

$modal->setSaddattr($element, $attr, $value) = Adiciona Atributos ao $element

$modal->setSremoveattr($element, $attr) = Remover Atributos do $element

$modal->setSaddhtml($element, $value) = Adiciona Html ao $element
$modal->setSaddhtml($element, $value) = Repetir fará uma nova iteração ao $element

$modal->setSaddclass($element, $class) = Adicionar Classe ao $element

$modal->setSremoveclass($element, $class) = Remove Classe do $element

$modal->setSremoveelement($element) = Remove o $element
$modal->setSremoveelement($element) = Remove o segundo $element
$modal->setSremoveelement($element) = Remove o terceiro $element

$modal->setSaddcss($element, $css, $value) = Adiciona css ao $elemento
$modal->setSaddcss($element, $css, $value) = Adiciona css ao segundo $elemento

```
#### Exemplos de utilização modal dialog para exclusão
##### Abrindo uma modal pela ação de um botão utilizando a classe Smodal

```
Botão que vai receber o click

$modal_delete = new \Source\Support\Smodal();
$modal_delete->setSmodaltype("delete");
$modal_delete->setSadddata("js-confirm", "post", url("/" . CONF_VIEW_APP . "/registration/departament"));
$modal_delete->setSaddhtml(
        "js-title",
        "<b>Atenção:</b> Tem certeza que deseja excluir esse departamento! Essa Ação não pode ser desfeita!"
);

<a class="icon-trash-o btn btn-small btn-red" href="#" title="Deletar Departamento?"
    <?= $modal_delete->renderString(); ?>
    data-action="delete"
    data-id="<?= $departament->id; ?>">Deletar</a>

Script que monitora o botão:

$(document).on('click', "[smodalname]", function (e) {
    e.preventDefault();
    $(this).smodal();
});    

```
##### Abrindo modal pelo callback do ajax

```
Objeto para ser enviado ao callback

$smodal = new Smodal('app_modal_departament_address');
        $smodal->setSmodalwidth(700);
        $smodal->setSmodaleffect("bounce");
        $smodal->setSmodalhtml(
            $this->view->render("widgets/registration/views/modal_vehicle", [
                "title" => $title,
                "vehicle" => $vehicleEdit,
                "departaments" => $departaments->order('name')->fetch(true)
            ]));

        $json["smodal"] = $smodal->renderObject();

Monitoramento do callback

if (response.smodal) {
    $(this).smodal(response.smodal);
}
