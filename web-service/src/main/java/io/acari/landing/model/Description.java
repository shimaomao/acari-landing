package io.acari.landing.model;

public class Description {
    private String _excerpt;
    private String _preachySpeechy;

    public Description(){}

  public Description(String _excerpt, String _preachySpeechy) {
    this._excerpt = _excerpt;
    this._preachySpeechy = _preachySpeechy;
  }

  public String get_excerpt() {
    return _excerpt;
  }

  public void set_excerpt(String _excerpt) {
    this._excerpt = _excerpt;
  }

  public String get_preachySpeechy() {
    return _preachySpeechy;
  }

  public void set_preachySpeechy(String _preachySpeechy) {
    this._preachySpeechy = _preachySpeechy;
  }
}
