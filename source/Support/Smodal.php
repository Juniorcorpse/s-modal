<?php

namespace Source\Support;

/**
 * Class Smodal
 * @package Source\Support
 */
class Smodal
{

    /**
     * @var
     */
    private $smodalname;
    /**
     * @var
     */
    private $smodaltype;
    /**
     * @var
     */
    private $smodalhtml;
    /**
     * @var
     */
    private $smodalwidth;
    /**
     * @var
     */
    private $smodalprint;
    /**
     * @var
     */
    private $smodaleffect;
    /**
     * @var
     */
    private $smodaldata;
    /**
     * @var
     */
    private $sadddata;
    /**
     * @var
     */
    private $sremovedata;
    /**
     * @var
     */
    private $saddattr;
    /**
     * @var
     */
    private $sremoveattr;
    /**
     * @var
     */
    private $saddhtml;
    /**
     * @var
     */
    private $saddclass;
    /**
     * @var
     */
    private $sremoveclass;
    /**
     * @var
     */
    private $sremoveelement;
    /**
     * @var
     */
    private $saddcss;

    /**
     * @var
     */
    private $resultstring;

    /**
     * Smodal constructor.
     */
    public function __construct(string $smodalname = 'app_modal_dialog')
    {
        $this->setSmodalname($smodalname);
    }

    /**
     * @param mixed $smodalname
     */
    public function setSmodalname(string $smodalname): void
    {
        $this->smodalname = $smodalname;

    }

    /**
     * @param mixed $smodaltype
     */
    public function setSmodaltype(string $smodaltype): void
    {
        $this->smodaltype = $smodaltype;

    }

    /**
     * @param mixed $smodalhtml
     */
    public function setSmodalhtml(string $smodalhtml): void
    {
        $this->smodalhtml = $smodalhtml;

    }

    /**
     * @param mixed $smodalwidth
     */
    public function setSmodalwidth(int $smodalwidth): void
    {
        $this->smodalwidth = $smodalwidth;

    }

    /**
     * @param mixed $smodalprint
     */
    public function setSmodalprint(string $smodalprint): void
    {
        $this->smodalprint = $smodalprint;

    }

    /**
     * @param mixed $smodaleffect
     */
    public function setSmodaleffect(string $smodaleffect): void
    {
        $this->smodaleffect = $smodaleffect;

    }

    /**
     * @param mixed $smodaldata
     */
    public function setSmodaldata(string $smodaldata): void
    {
        $this->smodaldata = $smodaldata;

    }

    /**
     * @param mixed $sadddata
     */
    public function setSadddata(string $element, string $data, string $value): void
    {
        $this->sadddata[] = [$element => [$data => $value]];
    }

    /**
     * @param mixed $sremovedata
     */
    public function setSremovedata(string $element, string $data): void
    {
        $this->sremovedata[] = [$element => $data];
    }

    /**
     * @param mixed $saddattr
     */
    public function setSaddattr(string $element, string $attr, string $value): void
    {
        $this->saddattr[] = [$element => [$data => $value]];
    }

    /**
     * @param mixed $sremoveattr
     */
    public function setSremoveattr(string $element, string $attr): void
    {
        $this->sremoveattr[] = [$element => $attr];
    }

    /**
     * @param mixed $saddhtml
     */
    public function setSaddhtml(string $element, string $value): void
    {
        $this->saddhtml[] = [$element => $value];
    }

    /**
     * @param mixed $saddclass
     */
    public function setSaddclass(string $element, string $class): void
    {
        $this->saddclass[$element] = $class;
    }

    /**
     * @param mixed $sremoveclass
     */
    public function setSremoveclass(string $element, string $class): void
    {
        $this->sremoveclass[$element] = $class;

    }

    /**
     * @param mixed $sremoveelement
     */
    public function setSremoveelement(string $element): void
    {
        $this->sremoveelement[] = $element;
    }

    /**
     * @param mixed $saddcss
     */
    public function setSaddcss(string $element, string $css, string $value): void
    {
        $this->saddcss[] = [$element => [$css => $value]];

    }

    /**
     * @param mixed $resultstring
     */
    public function setResultstring($resultstring): void
    {
        $this->resultstring = $resultstring;
    }

    /**
     * @return mixed
     */
    private function getResultstring(): ?string
    {
        return $this->resultstring;
    }

    public function renderString(): string
    {
        $this->setResultstring($this->getResultstring() . $this->createString('smodalname'));
        $this->setResultstring($this->getResultstring() . $this->createString('smodaltype'));
        $this->setResultstring($this->getResultstring() . $this->createString('smodalhtml'));
        $this->setResultstring($this->getResultstring() . $this->createString('smodalwidth'));
        $this->setResultstring($this->getResultstring() . $this->createString('smodalprint'));
        $this->setResultstring($this->getResultstring() . $this->createString('smodaleffect'));
        $this->setResultstring($this->getResultstring() . $this->createString('smodaldata'));
        $this->setResultstring($this->getResultstring() . $this->createString('sadddata'));
        $this->setResultstring($this->getResultstring() . $this->createString('sremovedata'));
        $this->setResultstring($this->getResultstring() . $this->createString('saddattr'));
        $this->setResultstring($this->getResultstring() . $this->createString('sremoveattr'));
        $this->setResultstring($this->getResultstring() . $this->createString('saddhtml'));
        $this->setResultstring($this->getResultstring() . $this->createString('saddclass'));
        $this->setResultstring($this->getResultstring() . $this->createString('sremoveclass'));
        $this->setResultstring($this->getResultstring() . $this->createString('sremoveelement'));
        $this->setResultstring($this->getResultstring() . $this->createString('saddcss'));

        return $this->getResultstring();
    }

    /**
     * @return object
     */
    public function renderObject(): object
    {
        $smodal = new \stdClass();
        $smodal->smodalname = $this->smodalname;
        $smodal->smodaltype = $this->smodaltype;
        $smodal->smodalhtml = $this->smodalhtml;
        $smodal->smodalwidth = $this->smodalwidth;
        $smodal->smodalprint = $this->smodalprint;
        $smodal->smodaleffect = $this->smodaleffect;
        $smodal->smodaldata = $this->createString('smodaldata');
        $smodal->sadddata = $this->createString('sadddata');
        $smodal->sremovedata = $this->createString('sremovedata');
        $smodal->saddattr = $this->createString('saddattr');
        $smodal->sremoveattr = $this->createString('sremoveattr');
        $smodal->saddhtml = $this->createString('saddhtml');
        $smodal->saddclass = $this->createString('saddclass');
        $smodal->sremoveclass = $this->createString('sremoveclass');
        $smodal->sremoveelement = $this->createString('sremoveelement');
        $smodal->saddcss = $this->createString('saddcss');

        return $smodal;
    }

    /**
     * @param $name
     * @return string
     */
    private function createString($name): ?string
    {
        $result = "";
        if ($this->$name) {
            $result = "{$name}='{$this->convertString($this->$name)}' ";
            $this->setResultstring($this->getResultstring() . $result);
        }
        return $result;
    }

    /**
     * @param $options
     * @return string
     */
    private function convertString($options): string
    {

        $result = "";
        if (!is_array($options)) {
            $result .= $options;
        } else {
            foreach ($options as $option) {
                foreach ($option as $subkey => $subvalue) {
                    if (is_int($subkey)) {
                        $result .= "{$subvalue}|";
                    } else {
                        if (!is_array($subvalue)) {
                            $result .= "{$subkey}::{$subvalue}|";
                        } else {
                            foreach ($subvalue as $ssbkey => $ssvalue) {

                                $result .= "{$subkey}::{$ssbkey}=={$ssvalue}|";
                            }
                        }
                    }
                }
            }
            $result = substr($result, 0, -1);
        }

        return $result;
    }


}
