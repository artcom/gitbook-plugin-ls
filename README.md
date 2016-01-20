# gitbook-plugin-ls

List files in a directory

## Installation:

`$ npm install artcom/gitbook-plugin-ls --save`

Add this to `book.json`:
```
{
    "plugins": ["ls"]
}
```

## Usage:

```
{% for file in "some/path" | ls %}
  {% if topic.isFile %}
    Path: {{ topic.path }}
    Basename: {{ topic.basename }}
  {% endif %}
{% endfor %}
```
